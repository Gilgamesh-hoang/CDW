package org.cdwbackend.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.cdwbackend.dto.DiscountDTO;
import org.cdwbackend.dto.request.CreateDiscountRequest;
import org.cdwbackend.dto.request.UpdateDiscountRequest;
import org.cdwbackend.dto.response.DiscountValidationResponse;
import org.cdwbackend.dto.response.PageResponse;
import org.cdwbackend.entity.database.*;
import org.cdwbackend.mapper.DiscountMapper;
import org.cdwbackend.repository.database.CategoryRepository;
import org.cdwbackend.repository.database.DiscountRepository;
import org.cdwbackend.repository.database.ProductRepository;
import org.cdwbackend.service.IDiscountService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DiscountServiceImpl implements IDiscountService {

    private final DiscountRepository discountRepository;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final DiscountMapper discountMapper;

    @Override
    @Transactional
    public DiscountDTO createDiscount(CreateDiscountRequest request) {
        // Check if discount code already exists
        if (discountRepository.findByCodeAndIsDeletedFalse(request.getCode()).isPresent()) {
            throw new IllegalArgumentException("Discount code already exists");
        }

        // Create new discount
        Discount discount = new Discount();
        discount.setCode(request.getCode());
        discount.setDescription(request.getDescription());
        discount.setDiscountType(request.getDiscountType());
        discount.setDiscountValue(request.getDiscountValue());
        discount.setMinimumOrderValue(request.getMinimumOrderValue());
        discount.setMaximumDiscountAmount(request.getMaximumDiscountAmount());
        discount.setStartDate(request.getStartDate());
        discount.setEndDate(request.getEndDate());
        discount.setUsageLimit(request.getUsageLimit());
        discount.setUsageCount(0);
        discount.setIsActive(true);
        discount.setIsDeleted(false);

        // Add products if specified
        if (request.getProductIds() != null && !request.getProductIds().isEmpty()) {
            List<Product> products = productRepository.findAllById(request.getProductIds());
            discount.setProducts(products);
        }

        // Add categories if specified
        if (request.getCategoryIds() != null && !request.getCategoryIds().isEmpty()) {
            List<Category> categories = categoryRepository.findAllById(request.getCategoryIds());
            discount.setCategories(categories);
        }

        Discount savedDiscount = discountRepository.save(discount);
        return discountMapper.toDTO(savedDiscount);
    }

    @Override
    @Transactional
    public DiscountDTO updateDiscount(UpdateDiscountRequest request) {
        Discount discount = discountRepository.findById(request.getId())
                .orElseThrow(() -> new EntityNotFoundException("Discount not found"));

        if (request.getDescription() != null) {
            discount.setDescription(request.getDescription());
        }
        if (request.getDiscountType() != null) {
            discount.setDiscountType(request.getDiscountType());
        }
        if (request.getDiscountValue() != null) {
            discount.setDiscountValue(request.getDiscountValue());
        }
        if (request.getMinimumOrderValue() != null) {
            discount.setMinimumOrderValue(request.getMinimumOrderValue());
        }
        if (request.getMaximumDiscountAmount() != null) {
            discount.setMaximumDiscountAmount(request.getMaximumDiscountAmount());
        }
        if (request.getStartDate() != null) {
            discount.setStartDate(request.getStartDate());
        }
        if (request.getEndDate() != null) {
            discount.setEndDate(request.getEndDate());
        }
        if (request.getUsageLimit() != null) {
            discount.setUsageLimit(request.getUsageLimit());
        }
        if (request.getIsActive() != null) {
            discount.setIsActive(request.getIsActive());
        }

        // Update products if specified
        if (request.getProductIds() != null) {
            List<Product> products = request.getProductIds().isEmpty()
                    ? new ArrayList<>()
                    : productRepository.findAllById(request.getProductIds());
            discount.setProducts(products);
        }

        // Update categories if specified
        if (request.getCategoryIds() != null) {
            List<Category> categories = request.getCategoryIds().isEmpty()
                    ? new ArrayList<>()
                    : categoryRepository.findAllById(request.getCategoryIds());
            discount.setCategories(categories);
        }

        Discount updatedDiscount = discountRepository.save(discount);
        return discountMapper.toDTO(updatedDiscount);
    }

    @Override
    public DiscountDTO findById(Long id) {
        Discount discount = discountRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Discount not found"));
        return discountMapper.toDTO(discount);
    }

    @Override
    public DiscountDTO findByCode(String code) {
        Discount discount = discountRepository.findByCodeAndIsDeletedFalse(code)
                .orElseThrow(() -> new EntityNotFoundException("Discount not found"));
        return discountMapper.toDTO(discount);
    }

    @Override
    public PageResponse<List<DiscountDTO>> findAll(Pageable pageable) {
        Page<Discount> discountPage = discountRepository.findAll(pageable);
        List<DiscountDTO> discountDTOs = discountMapper.toDTOs(discountPage.getContent());

        return PageResponse.<List<DiscountDTO>>builder()
                .data(discountDTOs)
                .currentPage(pageable.getPageNumber())
                .totalPage(discountPage.getTotalPages())
                .build();
    }

    @Override
    public List<DiscountDTO> findAllActive() {
        List<Discount> activeDiscounts = discountRepository.findAllActiveDiscounts(new Date());
        return discountMapper.toDTOs(activeDiscounts);
    }

    @Override
    @Transactional
    public void deleteDiscount(Long id) {
        Discount discount = discountRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Discount not found"));
        discount.setIsDeleted(true);
        discountRepository.save(discount);
    }

    @Override
    public DiscountValidationResponse validateDiscount(String code, List<Long> productIds, Double totalAmount) {
        try {
            // Find valid discount by code
            Discount discount = discountRepository.findValidDiscountByCode(code, new Date())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid or expired discount code"));

            // Check minimum order value
            if (discount.getMinimumOrderValue() != null && totalAmount < discount.getMinimumOrderValue()) {
                return DiscountValidationResponse.builder()
                        .valid(false)
                        .message("Order total does not meet the minimum amount required for this discount")
                        .build();
            }

            // Check if discount applies to specific products or categories
            boolean isApplicable = isDiscountApplicable(discount, productIds);
            if (!isApplicable) {
                return DiscountValidationResponse.builder()
                        .valid(false)
                        .message("Discount is not applicable to the items in your cart")
                        .build();
            }

            // Calculate discount amount
            Double discountAmount = calculateDiscountAmount(discount.getId(), productIds, totalAmount);

            return DiscountValidationResponse.builder()
                    .valid(true)
                    .message("Discount applied successfully")
                    .discount(discountMapper.toDTO(discount))
                    .discountAmount(discountAmount)
                    .build();

        } catch (Exception e) {
            return DiscountValidationResponse.builder()
                    .valid(false)
                    .message(e.getMessage())
                    .build();
        }
    }

    @Override
    public Double calculateDiscountAmount(Long discountId, List<Long> productIds, Double totalAmount) {
        Discount discount = discountRepository.findById(discountId)
                .orElseThrow(() -> new EntityNotFoundException("Discount not found"));

        double discountAmount = 0.0;

        // Calculate based on discount type
        switch (discount.getDiscountType()) {
            case PERCENTAGE:
                discountAmount = totalAmount * (discount.getDiscountValue() / 100);
                break;
            case FIXED_AMOUNT:
                discountAmount = discount.getDiscountValue();
                break;
            case FREE_SHIPPING:
                // Assuming a fixed shipping cost
                discountAmount = 0.0; // This would be replaced with actual shipping cost
                break;
        }

        // Apply maximum discount amount if specified
        if (discount.getMaximumDiscountAmount() != null && discountAmount > discount.getMaximumDiscountAmount()) {
            discountAmount = discount.getMaximumDiscountAmount();
        }

        return discountAmount;
    }

    // Helper method to check if discount applies to the products in cart
    private boolean isDiscountApplicable(Discount discount, List<Long> productIds) {
        // If no products or categories are specified, discount applies to all products
        if ((discount.getProducts() == null || discount.getProducts().isEmpty()) &&
                (discount.getCategories() == null || discount.getCategories().isEmpty())) {
            return true;
        }

        // If products are specified in the discount
        if (discount.getProducts() != null && !discount.getProducts().isEmpty()) {
            List<Long> discountProductIds = discount.getProducts().stream()
                    .map(Product::getId)
                    .collect(Collectors.toList());

            // Check if any product in cart is in the discount's product list
            for (Long productId : productIds) {
                if (discountProductIds.contains(productId)) {
                    return true;
                }
            }
        }

        // If categories are specified in the discount
        if (discount.getCategories() != null && !discount.getCategories().isEmpty()) {
            List<Long> discountCategoryIds = discount.getCategories().stream()
                    .map(Category::getId)
                    .collect(Collectors.toList());

            // Get categories of products in cart
            List<Product> cartProducts = productRepository.findAllById(productIds);
            for (Product product : cartProducts) {
                if (product.getCategory() != null &&
                        discountCategoryIds.contains(product.getCategory().getId())) {
                    return true;
                }
            }
        }

        return false;
    }
}
