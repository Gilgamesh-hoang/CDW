package org.cdwbackend.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class ProductDetailDTO {
    Long id;
    String name;
    String content;
    String shortDescription;
    String thumbnail;
    String modelUrl;
    String slug;
    Long categoryId;
    String categoryName;
    Integer totalViewAndSearch;
    Integer quantity;
    Integer available;
    Double subTotal;
    Date createAt;
    String[] images;
    List<SizeDTO> sizes;
}
