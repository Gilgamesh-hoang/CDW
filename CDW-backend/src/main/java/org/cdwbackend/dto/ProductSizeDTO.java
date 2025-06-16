package org.cdwbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductSizeDTO {
    private Long id;
    private Long sizeId;
    private String sizeName;
    private Long productId;
    private String productName;
    private String productThumbnail;
    private Double price;
    private Integer available;
} 