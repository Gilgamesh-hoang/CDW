package org.cdwbackend.controller.admin;



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

@RestController("AdminProductController")
@RequestMapping("${API_PREFIX}/admin/products")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ProductController {
    IProductService productService;

    @GetMapping("/{id}")
    public ResponseObject<ProductDetailDTO> getProductById(@PathVariable("id") @NotNull @Range(min = 1) Long id) {
        return new ResponseObject<>(HttpStatus.OK,productService.findById(id));
    }

    @GetMapping("/")
    public ResponseObject<List<ProductDTO>> getProducts(
            @RequestParam(value = "page", defaultValue = "1") @Range(min = 1) int page,
            @RequestParam(value = "size", defaultValue = "10") @Range(min = 1, max = 50) int size) {
        Sort sort = Sort.by(Sort.Order.desc("createAt"));
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        List<ProductDTO> products = productService.findAll(pageable).getData();
        return new ResponseObject<>(HttpStatus.OK, products);
    }

}
