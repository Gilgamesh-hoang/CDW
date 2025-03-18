package org.cdwbackend.controller.web;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.dto.CategoryDTO;
import org.cdwbackend.dto.response.ResponseObject;
import org.cdwbackend.service.ICategoryService;
import org.hibernate.validator.constraints.Range;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("WebCategoryController")
@RequestMapping("${API_PREFIX}/categories")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class CategoryController {
    ICategoryService categoryService;

    @GetMapping
    public ResponseObject<List<CategoryDTO>> getCategories(
            @RequestParam(value = "page", defaultValue = "1") @Range(min = 1) int page,
            @RequestParam(value = "size", defaultValue = "10") @Range(min = 1, max = 50) int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        List<CategoryDTO> categoryList = categoryService.findAll(pageable);
        return new ResponseObject<>(HttpStatus.OK, categoryList);
    }
}
