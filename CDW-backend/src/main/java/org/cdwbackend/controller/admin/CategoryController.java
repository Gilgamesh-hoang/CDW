package org.cdwbackend.controller.admin;


import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.dto.CategoryDTO;
import org.cdwbackend.dto.request.CreateCategoryRequest;
import org.cdwbackend.dto.request.UpdateCategoryRequest;
import org.cdwbackend.dto.response.ResponseObject;
import org.cdwbackend.service.ICategoryService;
import org.hibernate.validator.constraints.Range;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("AdminCategoryController")
@RequestMapping("${API_PREFIX}/admin/categories")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Validated
public class CategoryController {
    ICategoryService categoryService;

    @GetMapping("/exists/{code}")
    public ResponseObject<Boolean> existsCategory(@PathVariable("code") String code) {
        return new ResponseObject<>(HttpStatus.OK, categoryService.existsByCode(code));
    }

    @PostMapping
    public ResponseObject<CategoryDTO> createCategory(@RequestBody @Valid CreateCategoryRequest request) {
        return new ResponseObject<>(HttpStatus.CREATED, categoryService.save(request));
    }

    @PutMapping
    public ResponseObject<CategoryDTO> updateCategory(@RequestBody  @Valid UpdateCategoryRequest request) {
        return new ResponseObject<>(HttpStatus.OK, categoryService.update(request));
    }

    @DeleteMapping("/{id}")
    public ResponseObject<Void> deleteCategory(@PathVariable @Range(min = 1) Long id) {
        categoryService.delete(id);
        return new ResponseObject<>(HttpStatus.OK);
    }
}
