package org.cdwbackend.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartRequest {
    @NotNull(message = "Product id is required")
    @Min(message = "Product id must be greater than 0", value = 1)
    Long productId;

    @NotNull(message = "Size id is required")
    @Min(message = "Size id must be greater than 0", value = 1)
    Long sizeId;

    @NotNull(message = "Quantity is required")
    @Min(message = "Quantity must be greater than 0", value = 1)
    Integer quantity;
}
