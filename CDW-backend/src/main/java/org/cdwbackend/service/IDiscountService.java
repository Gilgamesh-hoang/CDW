package org.cdwbackend.service;

import org.cdwbackend.dto.DiscountDTO;
import org.cdwbackend.dto.request.CreateDiscountRequest;
import org.cdwbackend.dto.request.UpdateDiscountRequest;
import org.cdwbackend.dto.response.DiscountValidationResponse;
import org.cdwbackend.dto.response.PageResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IDiscountService {
    
    /**
     * Create a new discount
     * @param request The discount details
     * @return The created discount
     */
    DiscountDTO createDiscount(CreateDiscountRequest request);
    
    /**
     * Update an existing discount
     * @param request The discount update details
     * @return The updated discount
     */
    DiscountDTO updateDiscount(UpdateDiscountRequest request);
    
    /**
     * Find a discount by its ID
     * @param id The discount ID
     * @return The discount details
     */
    DiscountDTO findById(Long id);
    
    /**
     * Find a discount by its code
     * @param code The discount code
     * @return The discount details
     */
    DiscountDTO findByCode(String code);
    
    /**
     * Find all discounts with pagination
     * @param pageable Pagination information
     * @return A page of discounts
     */
    PageResponse<List<DiscountDTO>> findAll(Pageable pageable);
    
    /**
     * Find all active discounts
     * @return A list of active discounts
     */
    List<DiscountDTO> findAllActive();
    
    /**
     * Delete a discount by its ID
     * @param id The discount ID
     */
    void deleteDiscount(Long id);
    
    /**
     * Validate a discount code for a cart
     * @param code The discount code
     * @param cartItems List of product IDs in the cart
     * @param totalAmount The total amount of the cart
     * @return Validation response with discount details if valid
     */
    DiscountValidationResponse validateDiscount(String code, List<Long> productIds, Double totalAmount);
    
    /**
     * Calculate the discount amount for a cart
     * @param discountId The discount ID
     * @param productIds List of product IDs in the cart
     * @param totalAmount The total amount of the cart
     * @return The calculated discount amount
     */
    Double calculateDiscountAmount(Long discountId, List<Long> productIds, Double totalAmount);
    void increaseUsageCount(Long discountId);
}