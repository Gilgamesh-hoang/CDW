package org.cdwbackend.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.dto.ProductDTO;
import org.cdwbackend.dto.ProductDetailDTO;
import org.cdwbackend.dto.SizeDTO;
import org.cdwbackend.dto.response.PageResponse;
import org.cdwbackend.entity.database.Product;
import org.cdwbackend.entity.database.ProductImage;
import org.cdwbackend.entity.database.ProductSize;
import org.cdwbackend.entity.database.Size;
import org.cdwbackend.exception.ResourceNotFoundException;
import org.cdwbackend.mapper.ProductMapper;
import org.cdwbackend.mapper.SizeMapper;
import org.cdwbackend.repository.database.*;
import org.cdwbackend.service.IProductService;
import org.cdwbackend.service.IRedisService;
import org.cdwbackend.util.RedisKeyUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Service
public class ProductService implements IProductService {
    ProductRepository productRepository;
    ProductSizeRepository productSizeRepository;
    OrderDetailRepository orderDetailRepository;
    ProductRepositoryCustom repositoryCustom;
    ProductMapper productMapper;
    IRedisService redisService;
    ObjectMapper objectMapper;
    private final ProductImageRepository productImageRepository;
    private final SizeMapper sizeMapper;

    @Override
    public PageResponse<List<ProductDTO>> findAll(Pageable pageable) {
        String redisKey = RedisKeyUtil.getKeyForProductList(pageable);
        String jsonValue = redisService.getValue(redisKey, String.class);
        if (jsonValue != null) {
            try {
                return objectMapper.readValue(jsonValue, new TypeReference<PageResponse<List<ProductDTO>>>() {});
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }

        Page<Product> products = productRepository.findAll(pageable);
        List<ProductDTO> dtos = productMapper.toDTOs(products.getContent());
        dtos.forEach(this::setPrice);

        PageResponse<List<ProductDTO>> results = PageResponse.<List<ProductDTO>>builder()
                .currentPage(products.getNumber())
                .totalPage(products.getTotalPages())
                .data(dtos)
                .build();
        try {
            redisService.saveValue(redisKey, objectMapper.writeValueAsString(results));
            redisService.setTTL(redisKey, 1, TimeUnit.HOURS);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        return results;
    }

    @Override
    public PageResponse<List<ProductDTO>> searchByCategoryAndSize(List<Long> productIds, List<Long> categoryIds, List<Long> sizeIds, String priceRange, Pageable pageable) {
        Page<Product> products = repositoryCustom.findAllByCategoryAndSize(productIds, categoryIds, sizeIds,priceRange, pageable);

        List<ProductDTO> dtos = productMapper.toDTOs(products.getContent());
        dtos.forEach(product -> {
            setPrice(product);
            product.setContent(null);
        });

        return PageResponse.<List<ProductDTO>>builder()
                .currentPage(products.getNumber())
                .totalPage(products.getTotalPages())
                .data(dtos)
                .build();
    }

    @Override
    public List<ProductDTO> getNewestProducts(Pageable pageable) {
        String redisKey = RedisKeyUtil.getKeyForNewestProducts(pageable);
        List<ProductDTO> results = redisService.getList(redisKey, ProductDTO.class);
        if (results != null) {
            return results;
        }

        List<Product> products = productRepository.findAll(pageable).getContent();
        results = productMapper.toDTOs(products);
        results.forEach(this::setPrice);

        redisService.saveList(redisKey, results);
        redisService.setTTL(redisKey, 1, TimeUnit.HOURS);

        return results;
    }

    @Override
    public List<ProductDTO> getBestSellerProducts(Pageable pageable) {
        String redisKey = RedisKeyUtil.getKeyForBestSellerProducts(pageable);
        List<ProductDTO> results = redisService.getList(redisKey, ProductDTO.class);
        if (results != null) {
            return results;
        }

        List<Product> products = orderDetailRepository.findProductsByBestSelling(pageable);
        results = productMapper.toDTOs(products);
        results.forEach(this::setPrice);

        redisService.saveList(redisKey, results);
        redisService.setTTL(redisKey, 1, TimeUnit.HOURS);

        return results;
    }

    private void setPrice(ProductDTO product) {
        productSizeRepository.findByProductId(product.getId())
                .stream()
                .findFirst()
                .ifPresent(productSize -> product.setPrice(productSize.getPrice()));
    }

    @Override
    public ProductDetailDTO findById(Long id) {
        String redisKey = RedisKeyUtil.getProductKey(id);
        ProductDetailDTO productDTO = redisService.getValue(redisKey, ProductDetailDTO.class);
        Optional<Product> productOptional = productRepository.findById(id);
        if (productDTO != null) return productDTO;
        Product product = productRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Product not found"));
        String[] imageUrls = product.getProductImages().stream().map(ProductImage::getImageUrl).toArray(String[]::new);
        ProductDetailDTO result = productMapper.toDetailDTO(product);
        List<SizeDTO> sizeDTOs = product.getProductSizes().stream()
                .map(productSize -> {
                    SizeDTO sizeDTO = sizeMapper.toDTO(productSize.getSize());
                    sizeDTO.setPrice(productSize.getPrice());
                    return sizeDTO;
                })
                .collect(Collectors.toList());
        result.setSizes(sizeDTOs);
        result.setImages(imageUrls);
        return result;
    }
}
