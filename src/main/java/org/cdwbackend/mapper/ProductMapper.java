package org.cdwbackend.mapper;

import org.cdwbackend.dto.ProductDTO;
import org.cdwbackend.entity.database.Product;
import org.mapstruct.Mapper;

import java.util.List;


@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductDTO toDTO(Product product);

    List<ProductDTO> toDTOs(List<Product> products);
}

