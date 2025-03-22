package org.cdwbackend.mapper;

import org.cdwbackend.dto.OrderDTO;
import org.cdwbackend.entity.database.Order;
import org.mapstruct.Mapper;

import java.util.List;


@Mapper(componentModel = "spring", uses = {AddressMapper.class})
public interface OrderMapper {
    OrderDTO toDTO(Order order);

    List<OrderDTO> toDTOs(List<Order> orders);
}

