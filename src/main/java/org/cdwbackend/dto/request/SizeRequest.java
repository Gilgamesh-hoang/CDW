package org.cdwbackend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SizeRequest {
    private Long id;
    @NotBlank(message = "Name is required")
    private String name;
}
