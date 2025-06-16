package org.cdwbackend.mapper;

import org.cdwbackend.dto.ProductSizeDTO;
import org.cdwbackend.entity.database.ProductSize;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductSizeMapper {

    @Mapping(source = "size.id", target = "sizeId")
    @Mapping(source = "size.name", target = "sizeName")
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.name", target = "productName")
    @Mapping(source = "product.thumbnail", target = "productThumbnail")
    ProductSizeDTO toDTO(ProductSize productSize);
    
    List<ProductSizeDTO> toDTOs(List<ProductSize> productSizes);
} 