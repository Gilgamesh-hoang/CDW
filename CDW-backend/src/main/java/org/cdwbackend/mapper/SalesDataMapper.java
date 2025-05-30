package org.cdwbackend.mapper;

import org.cdwbackend.dto.response.SalesData;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SalesDataMapper {
    
    @Mapping(target = "date", source = "dateStr")
    @Mapping(target = "revenue", source = "revenueValue")
    @Mapping(target = "orders", source = "ordersCount")
    SalesData toSalesData(String dateStr, int revenueValue, int ordersCount);
} 