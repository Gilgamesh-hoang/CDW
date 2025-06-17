package org.cdwbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.cdwbackend.entity.database.DiscountType;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiscountDTO {
    private Long id;
    private String code;
    private String description;
    private DiscountType discountType;
    private Double discountValue;
    private Double minimumOrderValue;
    private Double maximumDiscountAmount;
    private Date startDate;
    private Date endDate;
    private Integer usageLimit;
    private Integer usageCount;
    private List<ProductDTO> products;
    private List<CategoryDTO> categories;
    private Boolean isActive;
    private Date createAt;
    private Date updateAt;
} 