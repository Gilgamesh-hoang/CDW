package org.cdwbackend.service;

import org.cdwbackend.dto.OrderDTO;
import org.cdwbackend.dto.request.UpdateStatusOrderRequest;
import org.cdwbackend.dto.response.PageResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IOrderService {
    OrderDTO findById(Long id);

    PageResponse<List<OrderDTO>> findAll(Pageable pageable);

    OrderDTO updateStatus(UpdateStatusOrderRequest request);
}
