package org.cdwbackend.dto.request;

import org.cdwbackend.dto.AddressDTO;

import lombok.Data;


@Data
public class CreateOrderRequest {
    private Long userId;
    private AddressDTO address;
    // Write more

}