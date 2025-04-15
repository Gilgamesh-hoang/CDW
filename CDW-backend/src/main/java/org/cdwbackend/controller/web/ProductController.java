package org.cdwbackend.controller.web;


import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.dto.ProductDTO;
import org.cdwbackend.dto.ProductDetailDTO;
import org.cdwbackend.dto.response.ResponseObject;
import org.cdwbackend.service.IProductService;
import org.hibernate.validator.constraints.Range;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("WebProductController")
@RequestMapping("${API_PREFIX}/products")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ProductController {
    IProductService productService;


    @GetMapping("/{id}")
    public ResponseObject<ProductDetailDTO> getProductById(@PathVariable("id") @NotNull @Range(min = 1) Long id) {
        return new ResponseObject<>(HttpStatus.OK,productService.findById(id));
    }
    @GetMapping("/newest")
    public ResponseObject<List<ProductDTO>> getNewestProducts(
            @RequestParam(value = "page", defaultValue = "1") @Range(min = 1) int page,
            @RequestParam(value = "size", defaultValue = "10") @Range(min = 1, max = 50) int size) {
        Sort sort = Sort.by("createAt").descending();
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        List<ProductDTO> products = productService.getNewestProducts(pageable);
        return new ResponseObject<>(HttpStatus.OK, products);
    }

    @GetMapping("/best-seller")
    public ResponseObject<List<ProductDTO>> getBestSellerProducts(
            @RequestParam(value = "page", defaultValue = "1") @Range(min = 1) int page,
            @RequestParam(value = "size", defaultValue = "10") @Range(min = 1, max = 50) int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        List<ProductDTO> products = productService.getBestSellerProducts(pageable);
        return new ResponseObject<>(HttpStatus.OK, products);
    }
}
