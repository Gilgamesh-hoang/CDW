package org.cdwbackend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.dto.CategoryDTO;
import org.cdwbackend.dto.request.CreateCategoryRequest;
import org.cdwbackend.dto.request.UpdateCategoryRequest;
import org.cdwbackend.entity.database.Category;
import org.cdwbackend.exception.ResourceNotFoundException;
import org.cdwbackend.mapper.CategoryMapper;
import org.cdwbackend.repository.database.CategoryRepository;
import org.cdwbackend.service.ICategoryService;
import org.cdwbackend.service.IRedisService;
import org.cdwbackend.util.RedisKeyUtil;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class CategoryService implements ICategoryService {
    IRedisService redisService;
    CategoryMapper categoryMapper;
    CategoryRepository categoryRepository;

    @Override
    public List<CategoryDTO> getAll(Pageable pageable) {
        String redisKey = RedisKeyUtil.getListCategoriesKey(pageable.getPageNumber(), pageable.getPageSize());
        List<CategoryDTO> categories = redisService.getList(redisKey, CategoryDTO.class);

        if (categories != null) {
            return categories;
        }

        categories = categoryMapper.toDTOs(categoryRepository.findAll(pageable).getContent());
        redisService.saveList(redisKey, categories);
        redisService.setTTL(redisKey, 60, TimeUnit.MINUTES);
        return categories;
    }

    @Override
    public boolean existsByCode(String code) {
        return categoryRepository.findCategoriesByCode(code) != null;
    }

    @Override
    public CategoryDTO save(CreateCategoryRequest request) {
        if (this.existsByCode(request.getCode())) {
            throw new IllegalArgumentException("Category code is already exist");
        }

        Category category = Category.builder()
                .name(request.getName())
                .code(request.getCode())
                .isDeleted(false)
                .build();
        categoryRepository.save(category);
        return categoryMapper.toDTO(category);
    }

    @Override
    public CategoryDTO update(UpdateCategoryRequest request) {
        if (!categoryRepository.existsById(request.getId())) {
            throw new ResourceNotFoundException("Category not found");
        }

        if (this.existsByCode(request.getCode())) {
            throw new IllegalArgumentException("Category code is already exist");
        }

        Category category = Category.builder()
                .id(request.getId())
                .name(request.getName())
                .code(request.getCode())
                .build();

        categoryRepository.save(category);
        redisService.deleteByPattern(RedisKeyUtil.getListCategoriesKey(0, 0).substring(0, 10));
        return categoryMapper.toDTO(category);
    }

    @Override
    public void delete(Long id) {
        Category category = categoryRepository.findById(id).orElse(null);
        if (category == null) {
            throw new ResourceNotFoundException("Category not found");
        }

        category.setIsDeleted(true);
        redisService.deleteByPattern(RedisKeyUtil.getListCategoriesKey(0, 0).substring(0, 10));
        categoryRepository.save(category);
    }

    @Override
    public List<CategoryDTO> getCategoriesAndCountProducts(Pageable pageable) {
        String redisKey = RedisKeyUtil.getListCategoriesKey(pageable.getPageNumber(), pageable.getPageSize());
        List<CategoryDTO> categories = redisService.getList(redisKey, CategoryDTO.class);

        if (categories != null) {
            return categories;
        }

        categories = categoryRepository.getCategoriesAndCountProducts(pageable);
        redisService.saveList(redisKey, categories);
        redisService.setTTL(redisKey, 60, TimeUnit.MINUTES);
        return categories;
    }

}
