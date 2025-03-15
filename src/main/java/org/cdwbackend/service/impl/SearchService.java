package org.cdwbackend.service.impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.dto.ProductDTO;
import org.cdwbackend.entity.elastic.ProductDocument;
import org.cdwbackend.repository.elastic.ICustomProductElasticRepo;
import org.cdwbackend.service.IProductService;
import org.cdwbackend.service.IRedisService;
import org.cdwbackend.service.ISearchService;
import org.cdwbackend.util.RedisKeyUtil;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.TimeUnit;

@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Service
public class SearchService implements ISearchService {
    ICustomProductElasticRepo elasticRepo;
    IProductService productService;
    IRedisService redisService;

    @Override
    public List<ProductDTO> search(String keyword, List<Long> categoryIds, List<Long> sizeIds, Pageable pageable, Sort sort) {
        // Get the first sort order
        Sort.Order order = sort.iterator().next();

        // Generate a Redis key for caching the search results
        String redisKey = RedisKeyUtil.getSearchKey(keyword,
                pageable.getPageNumber(),
                pageable.getPageSize(),
                order.getProperty(),
                order.getDirection().name(),
                categoryIds,
                sizeIds
        );

        // Check if the search results are already cached in Redis
        List<ProductDTO> products = redisService.getList(redisKey, ProductDTO.class);
        if (products != null) {
            return products; // Return cached results if available
        }

        // If no keyword is provided, fetch all products and sort them
        if (keyword.isBlank()) {
            products = productService.findAll(pageable);
            sort(products, order);

        } else {
            // Search for products by keyword in Elasticsearch and filter by category and size
            List<Long> ids = elasticRepo.findByKeyword(keyword).stream().map(ProductDocument::getId).toList();
            products = productService.searchByCategoryAndSize(ids, categoryIds, sizeIds, pageable);
            sort(products, order);
        }

        // Cache the search results in Redis
        redisService.saveList(redisKey, products);
        redisService.setTTL(redisKey, 5, TimeUnit.MINUTES); // Set TTL for the cache
        return products; // Return the search results
    }

    private void sort(List<ProductDTO> products, Sort.Order sort) {
        // Sort products by creation date
        if (sort.getProperty().equals("createAt")) {
            products.sort((p1, p2) -> {
                if (sort.getDirection().isAscending()) {
                    return p1.getCreateAt().compareTo(p2.getCreateAt());
                } else {
                    return p2.getCreateAt().compareTo(p1.getCreateAt());
                }
            });
            // Sort products by price
        } else if (sort.getProperty().equals("price")) {
            products.sort((p1, p2) -> {
                if (sort.getDirection().isAscending()) {
                    return p1.getPrice().compareTo(p2.getPrice());
                } else {
                    return p2.getPrice().compareTo(p1.getPrice());
                }
            });
            // Sort products by total views and searches
        } else if (sort.getProperty().equals("totalViewAndSearch")) {
            products.sort((p1, p2) -> {
                if (sort.getDirection().isAscending()) {
                    return p1.getTotalViewAndSearch().compareTo(p2.getTotalViewAndSearch());
                } else {
                    return p2.getTotalViewAndSearch().compareTo(p1.getTotalViewAndSearch());
                }
            });
        }
    }
}
