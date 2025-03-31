package org.cdwbackend.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.cdwbackend.constant.SystemConstant;
import org.cdwbackend.dto.OrderDTO;
import org.cdwbackend.dto.ProductDTO;
import org.cdwbackend.dto.request.UpdateStatusOrderRequest;
import org.cdwbackend.dto.response.PageResponse;
import org.cdwbackend.entity.database.*;
import org.cdwbackend.exception.ResourceNotFoundException;
import org.cdwbackend.mapper.OrderMapper;
import org.cdwbackend.mapper.ProductMapper;
import org.cdwbackend.repository.database.OrderRepository;
import org.cdwbackend.service.IOrderService;
import org.cdwbackend.service.IRedisService;
import org.cdwbackend.util.RedisKeyUtil;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class OrderService implements IOrderService {
    OrderRepository orderRepository;
    OrderMapper orderMapper;
    IRedisService redisService;
    ObjectMapper objectMapper;
    ProductMapper productMapper;
    @Override
    // Find an order by its ID and return its details along with the list of products in the order
    public OrderDTO findById(Long id) {
        String redisKey = RedisKeyUtil.getOrderKey(id);
        OrderDTO result = redisService.getValue(redisKey, OrderDTO.class);
        if (result != null) {
            return result;
        }

        // Retrieve the order from the repository, throw an exception if not found
        Order order = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        // Get the list of order details associated with the order
        List<OrderDetail> orderDetail = order.getOrderDetails();

        // Map each order detail to a ProductDTO and collect them into a list
        List<ProductDTO> listProduct = orderDetail.stream().map(detail -> {
            // Convert the product entity to a ProductDTO
            ProductDTO productDTO = productMapper.toDTO(detail.getProductSize().getProduct());
            ProductSize productSize = detail.getProductSize();
            Size sizeModel = productSize.getSize();

            // Set the product details in the ProductDTO
            productDTO.setQuantity(detail.getQuantity());
            productDTO.setSizeName(sizeModel.getName());
            productDTO.setSizeId(sizeModel.getId());
            productDTO.setPrice(productSize.getPrice());
            productDTO.setProductSizeId(productSize.getId());
            productDTO.setAvailable(productSize.getAvailable());
            productDTO.setSubTotal(detail.getSubTotal());
            productDTO.setShortDescription(null); // Set short description to null
            productDTO.setContent(null); // Set content to null

            return productDTO; // Return the populated ProductDTO
        }).toList();

        // Map the order entity to an OrderDTO
        OrderDTO orderDTO = orderMapper.toDTO(order);
        // Set the list of products in the OrderDTO
        orderDTO.setListProduct(listProduct);

        redisService.saveValue(redisKey, orderDTO);

        // Return the OrderDTO
        return orderDTO;
    }

    // Find all orders with pagination and return them as a list of OrderDTOs
    @Override
    public PageResponse<List<OrderDTO>> findAll(Pageable pageable) {
        String redisKey = RedisKeyUtil.getOrdersKey(pageable.getPageNumber(), pageable.getPageSize());
        try {
            // Check if the search results are already cached in Redis
            String jsonValue = redisService.getValue(redisKey, String.class);
            if (jsonValue != null) {
                return objectMapper.readValue(jsonValue, new TypeReference<PageResponse<List<OrderDTO>>>() {
                });
            }


            Page<Order> orders = orderRepository.findAll(Example.of(Order.builder().isDeleted(false).build()), pageable);

            PageResponse<List<OrderDTO>> results = PageResponse.<List<OrderDTO>>builder()
                    .currentPage(orders.getNumber())
                    .totalPage(orders.getTotalPages())
                    .data(orderMapper.toDTOs(orders.getContent()))
                    .build();

            redisService.saveValue(redisKey, objectMapper.writeValueAsString(results));
            redisService.setTTL(redisKey, 30, TimeUnit.MINUTES);

            return results;
        } catch (JsonProcessingException e) {
            log.error("Error processing JSON", e);
        }
        return PageResponse.<List<OrderDTO>>builder().data(new ArrayList<>()).build();
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

        redisService.deleteByPattern("order:*");

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
