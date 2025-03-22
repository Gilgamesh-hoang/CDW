package org.cdwbackend.dto.request;

import jakarta.validation.constraints.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.validation.enum_pattern.EnumPattern;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateStatusOrderRequest {
    @NotNull(message = "Id is mandatory")
    @Min(value = 1, message = "Id must be greater than 0")
    private Long id;

    @NotBlank(message = "Status is mandatory")
    @EnumPattern(name = "status", regexp = "CANCELED|DELIVERED|TRANSPORTING|PROCESSING")
    private String status;
}
