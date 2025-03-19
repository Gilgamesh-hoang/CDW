package org.cdwbackend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.constant.SystemConstant;
import org.cdwbackend.dto.OrderDTO;
import org.cdwbackend.dto.ProductDTO;
import org.cdwbackend.dto.request.UpdateStatusOrderRequest;
import org.cdwbackend.entity.database.Order;
import org.cdwbackend.entity.database.OrderDetail;
import org.cdwbackend.entity.database.Product;
import org.cdwbackend.entity.database.ProductSize;
import org.cdwbackend.exception.ResourceNotFoundException;
import org.cdwbackend.mapper.OrderMapper;
import org.cdwbackend.repository.database.OrderRepository;
import org.cdwbackend.service.IOrderService;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class OrderService implements IOrderService {
    OrderRepository orderRepository;
    OrderMapper orderMapper;

    @Override
    // Find an order by its ID and return its details along with the list of products in the order
    public OrderDTO findById(Long id) {
        // Retrieve the order from the repository, throw an exception if not found
        Order order = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        // Get the list of order details associated with the order
        List<OrderDetail> orderDetail = order.getOrderDetails();

        // Map each order detail to a ProductDTO and collect them into a list
        List<ProductDTO> listProduct = orderDetail.stream().map(detail -> {
            Product product = detail.getProductSize().getProduct();
            ProductSize productSize = detail.getProductSize();

            // Build and return a ProductDTO for each order detail
            return ProductDTO.builder()
                    .id(product.getId())
                    .name(product.getName())
                    .thumbnail(product.getThumbnail())
                    .subTotal(detail.getSubTotal())
                    .sizeName(productSize.getSize().getName())
                    .quantity(detail.getQuantity())
                    .build();
        }).toList();

        // Map the order entity to an OrderDTO
        OrderDTO orderDTO = orderMapper.toDTO(order);
        // Set the list of products in the OrderDTO
        orderDTO.setListProduct(listProduct);

        // Return the OrderDTO
        return orderDTO;
    }

    // Find all orders with pagination and return them as a list of OrderDTOs
    @Override
    public List<OrderDTO> findAll(Pageable pageable) {
        // Retrieve the paginated list of orders from the repository
        List<Order> orders = orderRepository.findAll(pageable).toList();
        // Map the list of orders to a list of OrderDTOs and return it
        return orderMapper.toDTOs(orders);
    }

    // Update the status of an order and return the updated OrderDTO
    @Override
    public OrderDTO updateStatus(UpdateStatusOrderRequest request) {
        // Retrieve the order from the repository, throw an exception if not found
        Order order = orderRepository.findById(request.getId()).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        String currentStatus = order.getStatus();
        String newStatus = request.getStatus();

        // Check if the status transition is valid, throw an exception if not
        if (!isValidStatusTransition(currentStatus, newStatus)) {
            throw new IllegalArgumentException("Invalid status transition");
        }

        // Update the status of the order
        order.setStatus(newStatus);
        orderRepository.save(order);
        // Map the updated order entity to an OrderDTO and return it
        return orderMapper.toDTO(order);
    }

    // Validate if the status transition is allowed
    private boolean isValidStatusTransition(String currentStatus, String newStatus) {
        // Do not allow changes if the order is already delivered or canceled
        if (currentStatus.equals(SystemConstant.ORDER_DELIVERED) || currentStatus.equals(SystemConstant.ORDER_CANCELED)) {
            return false;
        }

        // Do not allow transitioning back to processing from transporting
        if (currentStatus.equals(SystemConstant.ORDER_TRANSPORTING) && newStatus.equals(SystemConstant.ORDER_PROCESSING)) {
            return false;
        }

        // Allow all other transitions
        return true;
    }

}
