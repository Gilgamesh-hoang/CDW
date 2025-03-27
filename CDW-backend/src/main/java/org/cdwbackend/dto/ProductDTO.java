package org.cdwbackend.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDTO {
    Long id;
    String name;
    String content;
    String shortDescription;
    String thumbnail;
    Double price;
    String modelUrl;
    String slug;
    Long categoryId;
    String categoryName;
    Integer totalViewAndSearch;
    Long sizeId;
    String sizeName;
    Integer quantity;
    Integer available;
    Double subTotal;
    Long productSizeId;
    Date createAt;
}
