package org.cdwbackend.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.cdwbackend.dto.DiscountDTO;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiscountValidationResponse {
    @NotNull
    private boolean valid;
    private String message;
    private DiscountDTO discount;
    private Double discountAmount;
} 