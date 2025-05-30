package org.cdwbackend.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.cdwbackend.constant.SystemConstant;
import org.cdwbackend.dto.UserDTO;
import org.cdwbackend.dto.request.AuthenticationRequest;
import org.cdwbackend.dto.request.RegisterRequest;
import org.cdwbackend.dto.response.AuthResponse;
import org.cdwbackend.dto.response.JwtResponse;
import org.cdwbackend.dto.response.ResponseObject;
import org.cdwbackend.service.IAuthenticationService;
import org.cdwbackend.util.CookieUtil;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("${API_PREFIX}/auth")
@Validated
@Slf4j
public class AuthenticationController {
    IAuthenticationService authenticationService;


    private void setCookie(HttpServletResponse response, String refreshToken) {
        // Set refresh token in HTTP-Only cookie
        Cookie refreshTokenCookie = CookieUtil.createCookie(SystemConstant.REFRESH_TOKEN, refreshToken,
                "localhost", 604800, true, false);
        response.addCookie(refreshTokenCookie);
    }

    @PostMapping("/register")
    public ResponseObject<UserDTO> register(@RequestBody @Valid RegisterRequest request) {
        log.info("Register request: {}", request);
        if (!request.getPassword().equals(request.getRetypePassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }
        UserDTO user = authenticationService.register(request);
        return new ResponseObject<>(HttpStatus.OK, "Register successfully", user);
    }

    @PostMapping("/login")
    public ResponseObject<AuthResponse> authenticate(@RequestBody @Valid AuthenticationRequest request, HttpServletResponse response) {
        AuthResponse resp = authenticationService.login(request);
        setCookie(response, resp.getRefreshToken());
        return new ResponseObject<>(HttpStatus.OK,"Login successfully", resp);

    }

    @PostMapping("/refresh-token")
    public ResponseObject<JwtResponse> refreshToken(
            @CookieValue(SystemConstant.REFRESH_TOKEN) @NotBlank String refreshToken,
            HttpServletResponse response) {
        JwtResponse jwtObj = authenticationService.refreshToken(refreshToken);
        setCookie(response, jwtObj.getRefreshToken());
        return new ResponseObject<>(HttpStatus.OK, "Refresh token successfully", jwtObj);
    }

    @PostMapping("/logout")
    public ResponseObject<Void> logout(@RequestHeader("Authorization") String authHeader,
                                       @CookieValue(SystemConstant.REFRESH_TOKEN) @NotBlank String refreshToken,
                                       HttpServletResponse response
    ) {
        String jwtToken = authHeader.substring("Bearer ".length());
        authenticationService.logout(jwtToken, refreshToken);
        // clear refresh token cookie
        Cookie refreshTokenCookie = CookieUtil.createCookie(SystemConstant.REFRESH_TOKEN, null, "localhost",
                0, true, false);
        response.addCookie(refreshTokenCookie);
        return new ResponseObject<>(HttpStatus.OK, "Logout successfully", null);
    }
}
