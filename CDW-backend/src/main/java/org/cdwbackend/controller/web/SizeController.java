package org.cdwbackend.controller.web;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.dto.SizeDTO;
import org.cdwbackend.dto.response.PageResponse;
import org.cdwbackend.dto.response.ResponseObject;
import org.cdwbackend.service.ISizeService;
import org.hibernate.validator.constraints.Range;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
        Sort sort = Sort.by(Sort.Order.desc("createAt"));
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        List<SizeDTO> sizes = sizeService.findAll(pageable).getData();
        return new ResponseObject<>(HttpStatus.OK, sizes);
    }

    @GetMapping("/page")
    public ResponseObject<PageResponse<List<SizeDTO>>> getSizesPage(
            @RequestParam(value = "page", defaultValue = "1") @Range(min = 1) int page,
            @RequestParam(value = "size", defaultValue = "10") @Range(min = 1, max = 50) int size) {
        Sort sort = Sort.by(Sort.Order.desc("createAt"));
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        PageResponse<List<SizeDTO>> sizes = sizeService.findAll(pageable);
        return new ResponseObject<>(HttpStatus.OK, sizes);
    }

    @GetMapping("/{id}")
    public ResponseObject<SizeDTO> getSize(@PathVariable @Range(min = 1) Long id) {
        return new ResponseObject<>(HttpStatus.OK, sizeService.findById(id));
    }

}
