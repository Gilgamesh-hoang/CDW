package org.cdwbackend.service;

import jakarta.validation.Valid;
import org.cdwbackend.dto.SizeDTO;
import org.cdwbackend.dto.request.SizeRequest;
import org.cdwbackend.dto.response.PageResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ISizeService {
    PageResponse<List<SizeDTO>> findAll(Pageable pageable);

    boolean existsByName(String name);

    SizeDTO save(@Valid SizeRequest request);

    void delete(Long id);

    SizeDTO findById(Long id);
}
