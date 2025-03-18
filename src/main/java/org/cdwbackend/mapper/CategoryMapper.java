package org.cdwbackend.mapper;

import org.cdwbackend.dto.CategoryDTO;
import org.cdwbackend.dto.ProductDTO;
import org.cdwbackend.entity.database.Category;
import org.cdwbackend.entity.database.Product;
import org.mapstruct.Mapper;

import java.util.List;


@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryDTO toDTO(Category category);

    List<CategoryDTO> toDTOs(List<Category> categories);
}

