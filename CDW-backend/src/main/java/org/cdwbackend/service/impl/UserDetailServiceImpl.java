package org.cdwbackend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.dto.CustomUserSecurity;
import org.cdwbackend.entity.database.User;
import org.cdwbackend.exception.UserNotFoundException;
import org.cdwbackend.repository.database.UserRepository;
import org.springframework.data.domain.Example;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class UserDetailServiceImpl implements UserDetailsService {
    UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Example<User> example = Example.of(User.builder().email(username).isDeleted(false).build());
        User user = userRepo.findOne(example).orElse(null);
        if (user == null) {
            throw new UserNotFoundException("User not found with email: " + username);
        }
        List<GrantedAuthority> authority = List.of(new SimpleGrantedAuthority(user.getRole().getCode()));
        return new CustomUserSecurity(user, authority);
    }

}
