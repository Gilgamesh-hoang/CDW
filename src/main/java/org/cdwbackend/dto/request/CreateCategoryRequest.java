package org.cdwbackend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateCategoryRequest {
    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Code is required")
    private String code;
}
