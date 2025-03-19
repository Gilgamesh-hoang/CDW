package org.cdwbackend.mapper;

import org.cdwbackend.dto.AddressDTO;
import org.cdwbackend.dto.CategoryDTO;
import org.cdwbackend.entity.database.Address;
import org.cdwbackend.entity.database.Category;
import org.mapstruct.Mapper;

import java.util.List;


@Mapper(componentModel = "spring")
public interface AddressMapper {
    AddressDTO toDTO(Address address);

    List<AddressDTO> toDTOs(List<Address> addresses);
}

