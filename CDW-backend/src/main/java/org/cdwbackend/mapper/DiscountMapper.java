package org.cdwbackend.mapper;

import org.cdwbackend.dto.DiscountDTO;
import org.cdwbackend.entity.database.Discount;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = {ProductMapper.class, CategoryMapper.class})
public interface DiscountMapper {
    DiscountDTO toDTO(Discount discount);
    
    List<DiscountDTO> toDTOs(List<Discount> discounts);
} 