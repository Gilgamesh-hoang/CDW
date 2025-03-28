package org.cdwbackend.controller.web;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.apache.commons.lang3.StringUtils;
import org.cdwbackend.dto.ProductDTO;
import org.cdwbackend.dto.request.SearchRequest;
import org.cdwbackend.dto.response.PageResponse;
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

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("${API_PREFIX}/search")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class SearchController {
    ISearchService searchService;

    @PostMapping
    public ResponseObject<PageResponse<List<ProductDTO>>> search(@RequestBody SearchRequest request) {
        validate(request);

        Sort sort = Sort.by(Sort.Direction.fromString(request.getDirection()), request.getSort());
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getSize(), sort);
        PageResponse<List<ProductDTO>> productList = searchService.search(request, pageable);
        return new ResponseObject<>(HttpStatus.OK, productList);
    }

    private void validate( SearchRequest request) {
        if (!request.getSort().equals("price") && !request.getSort().equals("newest")) {
            throw new IllegalArgumentException("Invalid sortBy value");
        }
        if (!request.getDirection().equals("asc") && !request.getDirection().equals("desc")) {
            throw new IllegalArgumentException("Invalid direction value");
        }

        if (!StringUtils.isBlank(request.getPriceRange())) {
            String[] priceRanges = request.getPriceRange().split("-");
            if (priceRanges.length != 2) {
                throw new IllegalArgumentException("Invalid price range format");
            }
            try {
                double minPrice = Double.parseDouble(priceRanges[0]);
                double maxPrice = Double.parseDouble(priceRanges[1]);
                if (minPrice < 0 || maxPrice < 0 || minPrice > maxPrice) {
                    throw new IllegalArgumentException("Invalid price range value");
                }
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("Invalid price range value");
            }
        }

        String keyword = StringUtils.isBlank(request.getKeyword()) ? "" : request.getKeyword();
        int page = Math.max(request.getPage(), 0);
        int size = request.getSize() < 1 ? 10 : request.getSize();
        String sortBy = StringUtils.isBlank(request.getSort()) ? "newest" : request.getSort();
        String direction = StringUtils.isBlank(request.getDirection()) ? "desc" : request.getDirection();
        List<Long> categoryIds = request.getCategoryIds() == null ? new ArrayList<>() : request.getCategoryIds();
        List<Long> sizeIds = request.getSizeIds() == null ? new ArrayList<>() : request.getSizeIds();

        request.setKeyword(keyword);
        request.setPage(page);
        request.setSize(size);
        request.setSort(sortBy);
        request.setDirection(direction);
        request.setCategoryIds(categoryIds);
        request.setSizeIds(sizeIds);
    }
}
