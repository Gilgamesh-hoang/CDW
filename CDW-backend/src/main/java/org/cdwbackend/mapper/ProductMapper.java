package org.cdwbackend.mapper;

import org.cdwbackend.dto.ProductDTO;
import org.cdwbackend.dto.ProductDetailDTO;
import org.cdwbackend.entity.database.Product;
import org.cdwbackend.entity.elastic.ProductDocument;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;


@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "category.name", target = "categoryName")
    ProductDTO toDTO(Product product);

    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "category.name", target = "categoryName")
    ProductDetailDTO toDetailDTO(Product product);

    List<ProductDTO> toDTOs(List<Product> products);

    ProductDocument toDocument(Product product);

    void updateProductDocumentFromProduct(@MappingTarget ProductDocument productDocument, Product product);
}

