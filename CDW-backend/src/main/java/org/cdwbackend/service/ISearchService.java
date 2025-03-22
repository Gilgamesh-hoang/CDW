package org.cdwbackend.service;

import org.cdwbackend.dto.ProductDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface ISearchService {

    List<ProductDTO> search(String keyword, List<Long> categoryIds, List<Long> sizeIds, Pageable pageable, Sort sort);
}
