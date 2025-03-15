package org.cdwbackend.service;

import org.cdwbackend.dto.ProductDTO;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IProductService {
    List<ProductDTO> findAll(Pageable pageable);
}
