package org.cdwbackend.service.impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.cdwbackend.dto.UserDTO;
import org.cdwbackend.entity.database.User;
import org.cdwbackend.exception.ResourceNotFoundException;
import org.cdwbackend.mapper.UserMapper;
import org.cdwbackend.repository.database.UserRepository;
import org.cdwbackend.service.IRedisService;
import org.cdwbackend.service.IUserService;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService implements IUserService {
    IRedisService redisService;
    UserMapper userMapper;
    UserRepository userRepository;

    @Override
    public UserDTO getUserById(Long id) {
        Example<User> example = Example.of(User.builder().id(id).isDeleted(false).build());
        User user = userRepository.findOne(example).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return userMapper.toDTO(user);
    }
}
