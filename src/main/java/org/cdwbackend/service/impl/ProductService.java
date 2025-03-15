package org.cdwbackend.service.impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.dto.ProductDTO;
import org.cdwbackend.entity.database.Product;
import org.cdwbackend.mapper.ProductMapper;
import org.cdwbackend.repository.database.ProductRepository;
import org.cdwbackend.repository.database.ProductSizeRepository;
import org.cdwbackend.service.IProductService;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Service
public class ProductService implements IProductService {
    ProductRepository productRepository;
    ProductSizeRepository productSizeRepository;
    ProductMapper productMapper;

    @Override
    public List<ProductDTO> findAll(Pageable pageable) {
        List<Product> products = productRepository.findAll(pageable).getContent();
        List<ProductDTO> results = productMapper.toDTOs(products);
        results.forEach(this::setPrice);
        return results;
    }

    @Override
    public List<ProductDTO> searchByCategoryAndSize(List<Long> productIds, List<Long> categoryIds, List<Long> sizeIds, Pageable pageable) {
        List<Product> products = productRepository.findAllByCategoryAndSize(productIds, categoryIds, sizeIds, pageable);
        List<ProductDTO> results = productMapper.toDTOs(products);
        results.forEach(this::setPrice);
        return results;
    }

    private void setPrice(ProductDTO product) {
        productSizeRepository.findByProductId(product.getId())
                .stream()
                .findFirst()
                .ifPresent(productSize -> product.setPrice(productSize.getPrice()));
    }
}
