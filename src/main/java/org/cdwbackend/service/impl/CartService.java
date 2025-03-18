package org.cdwbackend.service.impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.cdwbackend.dto.ProductDTO;
import org.cdwbackend.dto.request.CartRequest;
import org.cdwbackend.entity.database.*;
import org.cdwbackend.exception.ResourceNotFoundException;
import org.cdwbackend.mapper.ProductMapper;
import org.cdwbackend.repository.database.CartRepository;
import org.cdwbackend.repository.database.OrderDetailRepository;
import org.cdwbackend.repository.database.ProductSizeRepository;
import org.cdwbackend.service.ICartService;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartService implements ICartService {
    CartRepository cartRepository;
    ProductMapper productMapper;
    ProductSizeRepository productSizeRepository;
    OrderDetailRepository orderDetailRepo;

    @Override
    public List<ProductDTO> getCartByUser(Long userId) {
        // Retrieve the cart items for the given user
        List<Cart> cartByUser = cartRepository.getCartByUser(userId);

        // Map each cart item to a ProductDTO
        List<ProductDTO> results = cartByUser.stream().map(cart -> {
            // Convert the product entity to a ProductDTO
            ProductDTO productDTO = productMapper.toDTO(cart.getOrderDetail().getProductSize().getProduct());

            // Get the product size details
            ProductSize productSizeModel = cart.getOrderDetail().getProductSize();
            Size sizeModel = productSizeModel.getSize();

            // Set the product details in the ProductDTO
            productDTO.setQuantity(cart.getOrderDetail().getQuantity());
            productDTO.setSizeName(sizeModel.getName());
            productDTO.setSizeId(sizeModel.getId());
            productDTO.setPrice(productSizeModel.getPrice());
            productDTO.setProductSizeId(productSizeModel.getId());
            productDTO.setAvailable(productSizeModel.getAvailable());
            productDTO.setShortDescription(null); // Set short description to null
            productDTO.setContent(null); // Set content to null

            return productDTO; // Return the populated ProductDTO
        }).toList();

        return results; // Return the list of ProductDTOs
    }

    @Override
    public void updateCart(Long userId, CartRequest request) {
        // Create an example of ProductSize based on the request
        Example<ProductSize> sizeExample = Example.of(
                ProductSize.builder()
                        .product(new Product(request.getProductId()))
                        .size(new Size(request.getSizeId()))
                        .build()
        );

        // Find the ProductSize or throw an exception if not found
        ProductSize productSize = productSizeRepository.findOne(sizeExample)
                .orElseThrow(() -> new ResourceNotFoundException("Product size not found"));

        // Check if the requested quantity is available
        if (productSize.getAvailable() < request.getQuantity()) {
            throw new IllegalArgumentException("Quantity is greater than available in stock");
        }

        // Find the cart item for the user and product size
        Cart cartItemByUser = cartRepository.findCartItemByUser(userId, productSize.getId());

        // If the cart item does not exist, create a new one
        if (cartItemByUser == null) {
            createNewCart(userId, request, productSize);
        } else {
            // If the cart item exists, update it
            updateExistingCart(cartItemByUser, request, productSize);
        }
    }

    private void createNewCart(Long userId, CartRequest request, ProductSize productSize) {
        // Create a new OrderDetail
        OrderDetail orderDetail = OrderDetail.builder()
                .productSize(productSize)
                .quantity(request.getQuantity())
                .subTotal(request.getQuantity() * productSize.getPrice())
                .order(null)
                .isDeleted(false)
                .build();
        orderDetailRepo.save(orderDetail);

        // Create a new Cart
        Cart cart = Cart.builder()
                .user(new User(userId))
                .isDeleted(false)
                .orderDetail(orderDetail).build();
        cartRepository.save(cart);
    }

    private void updateExistingCart(Cart cartItemByUser, CartRequest request, ProductSize productSize) {
        // Update the existing OrderDetail
        OrderDetail orderDetail = cartItemByUser.getOrderDetail();
        orderDetail.setProductSize(productSize);
        orderDetail.setQuantity(request.getQuantity());
        orderDetail.setSubTotal(request.getQuantity() * productSize.getPrice());
        orderDetailRepo.save(orderDetail);
    }
}
