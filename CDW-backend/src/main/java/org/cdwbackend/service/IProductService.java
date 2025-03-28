package org.cdwbackend.service;

import org.cdwbackend.dto.ProductDTO;
import org.cdwbackend.dto.response.PageResponse;
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
}
