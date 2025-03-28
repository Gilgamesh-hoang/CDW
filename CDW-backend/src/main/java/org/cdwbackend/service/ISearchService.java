package org.cdwbackend.service;

import org.cdwbackend.dto.ProductDTO;
import org.cdwbackend.dto.request.SearchRequest;
import org.cdwbackend.dto.response.PageResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface ISearchService {

    PageResponse<List<ProductDTO>> search(SearchRequest request, Pageable pageable);
}
