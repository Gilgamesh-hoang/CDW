package org.cdwbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
    private List<OrderDetailDTO> orderDetails;
}
