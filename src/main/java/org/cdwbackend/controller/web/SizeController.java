package org.cdwbackend.controller.web;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.dto.CategoryDTO;
import org.cdwbackend.dto.SizeDTO;
import org.cdwbackend.dto.response.ResponseObject;
import org.cdwbackend.service.ICategoryService;
import org.cdwbackend.service.ISizeService;
import org.hibernate.validator.constraints.Range;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("WebSizeController")
@RequestMapping("${API_PREFIX}/sizes")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class SizeController {
    ISizeService sizeService;

    @GetMapping
    public ResponseObject<List<SizeDTO>> getSizes(
            @RequestParam(value = "page", defaultValue = "1") @Range(min = 1) int page,
            @RequestParam(value = "size", defaultValue = "10") @Range(min = 1, max = 50) int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        List<SizeDTO> sizes = sizeService.findAll(pageable);
        return new ResponseObject<>(HttpStatus.OK, sizes);
    }

    @GetMapping("/exists/{name}")
    public ResponseObject<Boolean> existsCategory(@PathVariable("name") String name) {
        return new ResponseObject<>(HttpStatus.OK, sizeService.existsByName(name));
    }
}
