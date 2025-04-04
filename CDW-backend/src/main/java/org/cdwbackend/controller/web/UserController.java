package org.cdwbackend.controller.web;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.dto.CustomUserSecurity;
import org.cdwbackend.dto.UserDTO;
import org.cdwbackend.dto.response.ResponseObject;
import org.cdwbackend.service.IUserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("${API_PREFIX}/users")
@Validated
public class UserController {
    IUserService userService;

    @GetMapping("/me")
    public ResponseObject<UserDTO> getCurrentUser(@AuthenticationPrincipal CustomUserSecurity user) {
        return new ResponseObject<>(HttpStatus.OK, userService.getUserById(user.getId()));
    }
}
