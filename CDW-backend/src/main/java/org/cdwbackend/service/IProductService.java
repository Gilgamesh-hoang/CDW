package org.cdwbackend.service;

import org.cdwbackend.dto.ProductDTO;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IProductService {
    List<ProductDTO> findAll(Pageable pageable);

    List<ProductDTO> searchByCategoryAndSize(List<Long> productIds, List<Long> categoryIds, List<Long> sizeIds, Pageable pageable);

    List<ProductDTO> getNewestProducts(Pageable pageable);

    List<ProductDTO> getBestSellerProducts(Pageable pageable);
}
