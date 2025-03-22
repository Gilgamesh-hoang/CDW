package org.cdwbackend.controller.web;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.dto.ProductDTO;
import org.cdwbackend.dto.response.ResponseObject;
import org.cdwbackend.service.IProductService;
import org.cdwbackend.service.IRedisService;
import org.cdwbackend.util.RedisKeyUtil;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("${API_PREFIX}/home")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class HomeController {
    IProductService productService;
    IRedisService redisService;

    @GetMapping
    public ResponseObject<List<ProductDTO>> getProducts() {
        List<ProductDTO> productList = redisService.getList(RedisKeyUtil.HOMEPAGE_PRODUCTS, ProductDTO.class);
        if (productList != null) {
            return new ResponseObject<>(HttpStatus.OK, productList);
        }

        Pageable pageable = PageRequest.of(0, 3).withSort(Sort.by("totalViewAndSearch").descending());
        productList = productService.findAll(pageable);

        redisService.saveList(RedisKeyUtil.HOMEPAGE_PRODUCTS, productList);
        redisService.setTTL(RedisKeyUtil.HOMEPAGE_PRODUCTS, 10, TimeUnit.MINUTES);
        return new ResponseObject<>(HttpStatus.OK, productList);
    }
}
