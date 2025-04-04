package org.cdwbackend.mapper;

import org.cdwbackend.dto.UserDTO;
import org.cdwbackend.entity.database.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;


@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(source = "role.code", target = "role")
    UserDTO toDTO(User user);

    List<UserDTO> toDTOs(List<User> users);
}

