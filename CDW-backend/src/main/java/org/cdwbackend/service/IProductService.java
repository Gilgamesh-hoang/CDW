package org.cdwbackend.service;

import jakarta.validation.constraints.NotNull;
import org.cdwbackend.dto.ProductDTO;
import org.cdwbackend.dto.ProductDetailDTO;
import org.cdwbackend.dto.response.PageResponse;
import org.hibernate.validator.constraints.Range;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IProductService {
    PageResponse<List<ProductDTO>> findAll(Pageable pageable);

    PageResponse<List<ProductDTO>> searchByCategoryAndSize(List<Long> productIds, List<Long> categoryIds,
                                                           List<Long> sizeIds,
                                                           String priceRange,
                                                           Pageable pageable);

    List<ProductDTO> getNewestProducts(Pageable pageable);

    List<ProductDTO> getBestSellerProducts(Pageable pageable);

    ProductDetailDTO findById(@NotNull @Range(min = 1) Long id);
}
