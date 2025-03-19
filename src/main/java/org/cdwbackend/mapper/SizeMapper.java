package org.cdwbackend.mapper;

import org.cdwbackend.dto.SizeDTO;
import org.cdwbackend.entity.database.Size;
import org.mapstruct.Mapper;

import java.util.List;


@Mapper(componentModel = "spring")
public interface SizeMapper {
    SizeDTO toDTO(Size size);

    List<SizeDTO> toDTOs(List<Size> sizes);
}

