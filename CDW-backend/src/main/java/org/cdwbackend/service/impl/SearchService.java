package org.cdwbackend.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.cdwbackend.dto.ProductDTO;
import org.cdwbackend.dto.request.SearchRequest;
import org.cdwbackend.dto.response.PageResponse;
import org.cdwbackend.entity.elastic.ProductDocument;
import org.cdwbackend.repository.elastic.ICustomProductElasticRepo;
import org.cdwbackend.service.IProductService;
import org.cdwbackend.service.IRedisService;
import org.cdwbackend.service.ISearchService;
import org.cdwbackend.util.RedisKeyUtil;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Service
@Slf4j
public class SearchService implements ISearchService {
    ICustomProductElasticRepo elasticRepo;
    IProductService productService;
    IRedisService redisService;
    ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public PageResponse<List<ProductDTO>> search(SearchRequest request, Pageable pageable) {
        // Get the first sort order
        Sort.Order order = pageable.getSort().iterator().next();

        // Generate a Redis key for caching the search results
        String redisKey = RedisKeyUtil.getSearchKey(request.getKeyword(),
                request.getCategoryIds(), request.getSizeIds(), request.getPriceRange(), pageable);

        try {
            // Check if the search results are already cached in Redis
            String jsonValue = redisService.getValue(redisKey, String.class);
            if (jsonValue != null) {
                return objectMapper.readValue(jsonValue, new TypeReference<PageResponse<List<ProductDTO>>>() {
                });
            }

            PageResponse<List<ProductDTO>> products;
            // If no keyword is provided, fetch all products and sort them
            if (request.getKeyword().isBlank()) {
                products = productService.searchByCategoryAndSize(null, request.getCategoryIds(), request.getSizeIds(), request.getPriceRange(), pageable);
                sort(products, order);

            } else {
                // Search for products by keyword in Elasticsearch and filter by category and size
                List<Long> ids = elasticRepo.findByKeyword(request.getKeyword()).stream().map(ProductDocument::getId).toList();
                if (ids.isEmpty()) {
                    return PageResponse.<List<ProductDTO>>builder().data(new ArrayList<>()).build();
                }
                products = productService.searchByCategoryAndSize(ids, request.getCategoryIds(), request.getSizeIds(), request.getPriceRange(), pageable);
                sort(products, order);
            }

            // Cache the search results in Redis

            redisService.saveValue(redisKey, objectMapper.writeValueAsString(products));
            redisService.setTTL(redisKey, 5, TimeUnit.MINUTES); // Set TTL for the cache

            return products; // Return the search results
        } catch (JsonProcessingException e) {
            log.error("Error processing JSON", e);
        }
        return PageResponse.<List<ProductDTO>>builder().data(new ArrayList<>()).build();

    }

    private void sort(PageResponse<List<ProductDTO>> products, Sort.Order sort) {
        // Sort products by creation date
        if (sort.getProperty().equals("newest")) {
            products.getData().sort((p1, p2) -> {
                if (sort.getDirection().isAscending()) {
                    return p1.getCreateAt().compareTo(p2.getCreateAt());
                } else {
                    return p2.getCreateAt().compareTo(p1.getCreateAt());
                }
            });
            // Sort products by price
        } else if (sort.getProperty().equals("price")) {
            products.getData().sort((p1, p2) -> {
                if (sort.getDirection().isAscending()) {
                    return p1.getPrice().compareTo(p2.getPrice());
                } else {
                    return p2.getPrice().compareTo(p1.getPrice());
                }
            });
        }
    }
}
