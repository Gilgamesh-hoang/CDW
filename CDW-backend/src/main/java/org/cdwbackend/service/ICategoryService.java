package org.cdwbackend.service;

import org.cdwbackend.dto.CategoryDTO;
import org.cdwbackend.dto.request.CreateCategoryRequest;
import org.cdwbackend.dto.request.UpdateCategoryRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ICategoryService {
    List<CategoryDTO> getAll(Pageable pageable);

    boolean existsByCode(String code);

    CategoryDTO save(CreateCategoryRequest request);

    CategoryDTO update(UpdateCategoryRequest request);

    void delete(Long id);

    List<CategoryDTO> getCategoriesAndCountProducts(Pageable pageable);

    CategoryDTO getCategory(Long id);
}
