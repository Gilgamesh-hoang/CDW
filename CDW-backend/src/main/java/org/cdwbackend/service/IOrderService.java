package org.cdwbackend.service;

import org.cdwbackend.dto.OrderDTO;
import org.cdwbackend.dto.request.ApplyDiscountRequest;
import org.cdwbackend.dto.request.CreateOrderRequest;
import org.cdwbackend.dto.request.UpdateStatusOrderRequest;
import org.cdwbackend.dto.response.DiscountValidationResponse;
import org.cdwbackend.dto.response.PageResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IOrderService {
    
    /**
     * Create a new order for the given user
     * @param userId The ID of the user placing the order
     * @param request The order details
     * @return The created order details
     */
    OrderDTO createOrder(Long userId, CreateOrderRequest request);
    
    /**
     * Find an order by its ID
     * @param id The order ID
     * @return The order details
     */
    OrderDTO findById(Long id);
    
    /**
     * Find all orders (admin function)
     * @param pageable Pagination information
     * @return A page of orders
     */
    PageResponse<List<OrderDTO>> findAll(Pageable pageable);
    
    /**
     * Find all orders for a specific user
     * @param userId The user ID
     * @return A list of orders for the user
     */
    List<OrderDTO> findByUserId(Long userId);
    
    /**
     * Find a specific order for a specific user
     * @param id The order ID
     * @param userId The user ID
     * @return The order details if it belongs to the user
     */
    OrderDTO findByIdAndUserId(Long id, Long userId);
    
    /**
     * Find an order by its slug
     * @param slug The order slug
     * @return The order details
     */
    OrderDTO findBySlug(String slug);
    
    /**
     * Update the status of an order (admin function)
     * @param request The update request containing the order ID and new status
     * @return The updated order
     */
    OrderDTO updateStatus(UpdateStatusOrderRequest request);
    
    /**
     * Cancel an order for a user
     * @param id The order ID
     * @param userId The user ID
     * @return The canceled order
     */
    OrderDTO cancelOrder(Long id, Long userId);
    
    /**
     * Apply a discount code to a cart before creating an order
     * @param userId The user ID
     * @param request The discount code request
     * @return Validation response with discount details if valid
     */
    DiscountValidationResponse applyDiscountToCart(Long userId, ApplyDiscountRequest request);
}
