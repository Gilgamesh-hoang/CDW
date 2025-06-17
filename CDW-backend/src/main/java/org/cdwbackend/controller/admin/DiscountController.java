package org.cdwbackend.controller.admin;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.cdwbackend.dto.DiscountDTO;
import org.cdwbackend.dto.request.CreateDiscountRequest;
import org.cdwbackend.dto.request.UpdateDiscountRequest;
import org.cdwbackend.dto.response.PageResponse;
import org.cdwbackend.service.IDiscountService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("AdminDiscountController")
@RequestMapping("/api/admin/discounts")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class DiscountController {

    private final IDiscountService discountService;

    @PostMapping
    public ResponseEntity<DiscountDTO> createDiscount(@Valid @RequestBody CreateDiscountRequest request) {
        return new ResponseEntity<>(discountService.createDiscount(request), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<DiscountDTO> updateDiscount(@Valid @RequestBody UpdateDiscountRequest request) {
        return ResponseEntity.ok(discountService.updateDiscount(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DiscountDTO> getDiscountById(@PathVariable Long id) {
        return ResponseEntity.ok(discountService.findById(id));
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<DiscountDTO> getDiscountByCode(@PathVariable String code) {
        return ResponseEntity.ok(discountService.findByCode(code));
    }

    @GetMapping
    public ResponseEntity<PageResponse<List<DiscountDTO>>> getAllDiscounts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
        return ResponseEntity.ok(discountService.findAll(pageable));
    }

    @GetMapping("/active")
    public ResponseEntity<List<DiscountDTO>> getActiveDiscounts() {
        return ResponseEntity.ok(discountService.findAllActive());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDiscount(@PathVariable Long id) {
        discountService.deleteDiscount(id);
        return ResponseEntity.noContent().build();
    }
} 