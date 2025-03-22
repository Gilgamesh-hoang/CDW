package org.cdwbackend.controller.web;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.apache.commons.lang3.StringUtils;
import org.cdwbackend.dto.ProductDTO;
import org.cdwbackend.dto.request.SearchRequest;
import org.cdwbackend.dto.response.ResponseObject;
import org.cdwbackend.service.ISearchService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("${API_PREFIX}/search")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class SearchController {
    ISearchService searchService;

    @PostMapping
    public ResponseObject<List<ProductDTO>> search(@RequestBody SearchRequest request) {
        String keyword = StringUtils.isBlank(request.getKeyword()) ? "" : request.getKeyword();
        int page = Math.max(request.getPage(), 0);
        int size = request.getSize() < 1 ? 10 : request.getSize();
        String sortBy = StringUtils.isBlank(request.getSort()) ? "createAt" : request.getSort();
        String direction = StringUtils.isBlank(request.getDirection()) ? "desc" : request.getDirection();

        Pageable pageable = PageRequest.of(page, size);
        Sort sort = Sort.by(Sort.Direction.fromString(direction), sortBy);
        List<ProductDTO> productList = searchService.search(keyword, request.getCategoryIds(), request.getSizeIds(), pageable, sort);
        return new ResponseObject<>(HttpStatus.OK, productList);
    }
}
