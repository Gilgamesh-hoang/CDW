package org.cdwbackend.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class OrderDTO {
    private Long id;
    private String status;
    private String note;
    private Double totalAmount;
    private AddressDTO address;
    private Boolean isPaid;
    private String slug;
    private Date createAt;
    private List<ProductDTO> listProduct;
}
