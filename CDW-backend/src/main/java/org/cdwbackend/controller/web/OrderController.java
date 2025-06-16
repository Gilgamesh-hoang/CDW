package org.cdwbackend.controller.web;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.constant.SystemConstant;
import org.cdwbackend.dto.CustomUserSecurity;
import org.cdwbackend.dto.OrderDTO;
import org.cdwbackend.dto.request.CreateOrderRequest;
import org.cdwbackend.dto.response.ResponseObject;
import org.cdwbackend.service.IOrderService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${API_PREFIX}/orders")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Validated
public class OrderController {
    
    IOrderService orderService;
    
    @PostMapping
    public ResponseObject<OrderDTO> createOrder(
            @AuthenticationPrincipal CustomUserSecurity user,
            @RequestBody @Valid CreateOrderRequest request) {
        // Get user ID from token
        Long userId = user.getId();
        
        // Set initial status to PROCESSING
        request.setStatus(SystemConstant.ORDER_PROCESSING);
        
        // Call service to create order
        OrderDTO orderDTO = orderService.createOrder(userId, request);
        
        return new ResponseObject<>(HttpStatus.CREATED, "Order created successfully", orderDTO);
    }
    
    @GetMapping
    public ResponseObject<java.util.List<OrderDTO>> getUserOrders(
            @AuthenticationPrincipal CustomUserSecurity user) {
        // Get orders for the authenticated user
        java.util.List<OrderDTO> orders = orderService.findByUserId(user.getId());
        return new ResponseObject<>(HttpStatus.OK, orders);
    }
    
    @GetMapping("/{id}")
    public ResponseObject<OrderDTO> getOrderById(
            @AuthenticationPrincipal CustomUserSecurity user,
            @PathVariable Long id) {
        // Get order by ID for the authenticated user
        OrderDTO order = orderService.findByIdAndUserId(id, user.getId());
        return new ResponseObject<>(HttpStatus.OK, order);
    }
    
    @GetMapping("/slug/{slug}")
    public ResponseObject<OrderDTO> getOrderBySlug(
            @PathVariable String slug) {
        // Get order by slug - this is publicly accessible to allow sharing order confirmations
        OrderDTO order = orderService.findBySlug(slug);
        return new ResponseObject<>(HttpStatus.OK, order);
    }
    
    @PutMapping("/{id}/cancel")
    public ResponseObject<OrderDTO> cancelOrder(
            @AuthenticationPrincipal CustomUserSecurity user,
            @PathVariable Long id) {
        // Cancel order
        OrderDTO order = orderService.cancelOrder(id, user.getId());
        return new ResponseObject<>(HttpStatus.OK, "Order cancelled successfully", order);
    }
} 