package org.cdwbackend.controller.web;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.cdwbackend.dto.request.ApplyDiscountRequest;
import org.cdwbackend.dto.response.DiscountValidationResponse;
import org.cdwbackend.service.IOrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/discounts")
@RequiredArgsConstructor
public class DiscountController {

    private final IOrderService orderService;

    @PostMapping("/apply")
    public ResponseEntity<DiscountValidationResponse> applyDiscount(
            @Valid @RequestBody ApplyDiscountRequest request,
            Authentication authentication) {
        
        Long userId = Long.parseLong(authentication.getName());
        return ResponseEntity.ok(orderService.applyDiscountToCart(userId, request));
    }
} 