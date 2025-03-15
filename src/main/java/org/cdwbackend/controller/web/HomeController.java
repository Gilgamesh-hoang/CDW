package org.cdwbackend.controller.web;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.dto.ProductDTO;
import org.cdwbackend.dto.response.ResponseObject;
import org.cdwbackend.service.IProductService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("${API_PREFIX}/home")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class HomeController {
    IProductService productService;

    @GetMapping
    public ResponseObject<List<ProductDTO>> getProducts() {

        Pageable pageable = PageRequest.of(0, 3).withSort(Sort.by("totalViewAndSearch").descending());
        List<ProductDTO> productList = productService.findAll(pageable);
        return new ResponseObject<>(HttpStatus.OK, productList);
    }
}
