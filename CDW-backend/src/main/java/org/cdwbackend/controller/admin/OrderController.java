package org.cdwbackend.controller.admin;


import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.dto.OrderDTO;
import org.cdwbackend.dto.request.UpdateStatusOrderRequest;
import org.cdwbackend.dto.response.PageResponse;
import org.cdwbackend.dto.response.ResponseObject;
import org.cdwbackend.service.IOrderService;
import org.hibernate.validator.constraints.Range;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("AdminOrderController")
@RequestMapping("${API_PREFIX}/admin/orders")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Validated
public class OrderController {
    IOrderService orderService;

    @GetMapping("/{id}")
    public ResponseObject<OrderDTO> getOrderById(@PathVariable("id") @NotNull @Range(min = 1) Long id) {
        return new ResponseObject<>(HttpStatus.OK, orderService.findById(id));
    }


    @GetMapping
    public ResponseObject<PageResponse<List<OrderDTO>>> getOrders(
            @RequestParam(value = "page", defaultValue = "1") @Range(min = 1) int page,
            @RequestParam(value = "size", defaultValue = "10") @Range(min = 1, max = 50) int size) {
        Sort sort = Sort.by("createAt").descending();
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        return new ResponseObject<>(HttpStatus.OK, orderService.findAll(pageable));
    }

    @PutMapping
    public ResponseObject<OrderDTO> updateStatus(@RequestBody @Valid UpdateStatusOrderRequest request) {
        return new ResponseObject<>(HttpStatus.CREATED, orderService.updateStatus(request));
    }

//    @PostMapping
//    public ResponseObject<OrderDTO> createOrder(@RequestBody @Valid CreateOrderRequest request) {
//        return new ResponseObject<>(HttpStatus.CREATED, orderService.createOrder(request));
//    }

}
