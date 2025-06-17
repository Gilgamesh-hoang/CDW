package org.cdwbackend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplyDiscountRequest {
    @NotBlank(message = "Discount code is required")
    @Pattern(regexp = "^[A-Z0-9_]+$", message = "Invalid discount code format")
    @Size(min = 3, max = 20, message = "Discount code must be between 3 and 20 characters")
    private String code;

    private List<Long> productIds;

    private Double totalAmount;
} 