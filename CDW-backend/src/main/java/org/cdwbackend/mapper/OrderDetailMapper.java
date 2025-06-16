package org.cdwbackend.mapper;

import org.cdwbackend.dto.OrderDetailDTO;
import org.cdwbackend.entity.database.OrderDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {ProductSizeMapper.class})
public interface OrderDetailMapper {
    
    @Mapping(source = "productSize", target = "productSize")
    OrderDetailDTO toDTO(OrderDetail orderDetail);
    
    List<OrderDetailDTO> toDTOs(List<OrderDetail> orderDetails);
} 