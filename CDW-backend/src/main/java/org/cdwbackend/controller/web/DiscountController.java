package org.cdwbackend.controller.web;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.cdwbackend.dto.request.ApplyDiscountRequest;
import org.cdwbackend.dto.response.DiscountValidationResponse;
import org.cdwbackend.dto.DiscountDTO;
import org.cdwbackend.service.IDiscountService;
import org.cdwbackend.service.IOrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("DiscountController")
@RequestMapping("${API_PREFIX}/discounts")
@RequiredArgsConstructor
public class DiscountController {

    private final IDiscountService discountService;


    // API lấy danh sách mã giảm giá hợp lệ
    @GetMapping("/available")
    public ResponseEntity<List<DiscountDTO>> getAvailableDiscounts() {
        List<DiscountDTO> discounts = discountService.findAllActive();
        return ResponseEntity.ok(discounts);
    }

    // API validate discount
    @PostMapping("/validate")
    public ResponseEntity<DiscountValidationResponse> validateDiscount(@RequestBody ApplyDiscountRequest request) {
        DiscountValidationResponse response = discountService.validateDiscount(
            request.getCode(),
            request.getProductIds(),
            request.getTotalAmount()
        );
        return ResponseEntity.ok(response);
    }
} 