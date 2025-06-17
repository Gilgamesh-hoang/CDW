package org.cdwbackend.dto.request;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.cdwbackend.entity.database.DiscountType;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateDiscountRequest {
    @NotBlank(message = "Discount code is required")
    @Pattern(regexp = "^[A-Z0-9_]+$", message = "Discount code must contain only uppercase letters, numbers and underscores")
    @Size(min = 3, max = 20, message = "Discount code must be between 3 and 20 characters")
    private String code;
    
    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;
    
    @NotNull(message = "Discount type is required")
    private DiscountType discountType;
    
    @NotNull(message = "Discount value is required")
    @Positive(message = "Discount value must be positive")
    @DecimalMax(value = "100.0", message = "Percentage discount cannot exceed 100%", groups = PercentageDiscountGroup.class)
    private Double discountValue;
    
    @PositiveOrZero(message = "Minimum order value must be positive or zero")
    private Double minimumOrderValue;
    
    @PositiveOrZero(message = "Maximum discount amount must be positive or zero")
    private Double maximumDiscountAmount;
    
    @NotNull(message = "Start date is required")
    @FutureOrPresent(message = "Start date must be in the present or future")
    private Date startDate;
    
    @NotNull(message = "End date is required")
    @Future(message = "End date must be in the future")
    private Date endDate;
    
    @PositiveOrZero(message = "Usage limit must be positive or zero")
    private Integer usageLimit;
    
    private List<Long> productIds;
    
    private List<Long> categoryIds;
    
    // Validation group for percentage discount type
    public interface PercentageDiscountGroup {}
    
    @AssertTrue(message = "End date must be after start date")
    private boolean isEndDateAfterStartDate() {
        if (startDate == null || endDate == null) {
            return true;
        }
        return endDate.after(startDate);
    }
} 