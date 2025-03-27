package org.cdwbackend.mapper;

import org.cdwbackend.dto.ProductDTO;
import org.cdwbackend.entity.database.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;


@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "category.name", target = "categoryName")
    ProductDTO toDTO(Product product);

    List<ProductDTO> toDTOs(List<Product> products);
}

