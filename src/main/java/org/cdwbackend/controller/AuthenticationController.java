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
import org.cdwbackend.dto.request.AuthenticationRequest;
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


    private ResponseObject<JwtResponse> createResponse(HttpServletResponse response, JwtResponse jwtObj, String message) {
        // Set refresh token in HTTP-Only cookie
        Cookie refreshTokenCookie = CookieUtil.createCookie(SystemConstant.REFRESH_TOKEN, jwtObj.getRefreshToken(),
                "localhost", 604800, true, false);
        response.addCookie(refreshTokenCookie);
        return new ResponseObject<>(HttpStatus.OK, message, jwtObj);
    }


    @PostMapping("/login")
    public ResponseObject<JwtResponse> authenticate(@RequestBody @Valid AuthenticationRequest request, HttpServletResponse response) {
        JwtResponse jwtObj = authenticationService.login(request);
        return createResponse(response, jwtObj, "Login successfully");
    }

    @PostMapping("/refresh-token")
    public ResponseObject<JwtResponse> refreshToken(
            @CookieValue(SystemConstant.REFRESH_TOKEN) @NotBlank String refreshToken,
            HttpServletResponse response) {
        JwtResponse jwtObj = authenticationService.refreshToken(refreshToken);
        return createResponse(response, jwtObj, "Refresh token successfully");
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
