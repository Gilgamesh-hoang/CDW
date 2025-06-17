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
public class UpdateDiscountRequest {
    @NotNull(message = "Discount ID is required")
    private Long id;
    
    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;
    
    private DiscountType discountType;
    
    @Positive(message = "Discount value must be positive")
    @DecimalMax(value = "100.0", message = "Percentage discount cannot exceed 100%", groups = PercentageDiscountGroup.class)
    private Double discountValue;
    
    @PositiveOrZero(message = "Minimum order value must be positive or zero")
    private Double minimumOrderValue;
    
    @PositiveOrZero(message = "Maximum discount amount must be positive or zero")
    private Double maximumDiscountAmount;
    
    @FutureOrPresent(message = "Start date must be in the present or future")
    private Date startDate;
    
    @Future(message = "End date must be in the future")
    private Date endDate;
    
    @PositiveOrZero(message = "Usage limit must be positive or zero")
    private Integer usageLimit;
    
    private List<Long> productIds;
    
    private List<Long> categoryIds;
    
    private Boolean isActive;
    
    @AssertTrue(message = "End date must be after start date")
    private boolean isEndDateAfterStartDate() {
        if (startDate == null || endDate == null) {
            return true;
        }
        return endDate.after(startDate);
    }
    
    // Validation group for percentage discount type
    public interface PercentageDiscountGroup {}
} 