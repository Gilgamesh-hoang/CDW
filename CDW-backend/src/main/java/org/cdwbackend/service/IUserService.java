package org.cdwbackend.service;

import org.cdwbackend.dto.UserDTO;

public interface IUserService {
    UserDTO getUserById(Long id);
}
