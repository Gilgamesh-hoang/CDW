package org.cdwbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.cdwbackend.entity.database.ProductSize;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDTO {
    private Long id;
    private Integer quantity;
    private Double subTotal;
    private ProductSize productSize;
    private Date createAt;
} 