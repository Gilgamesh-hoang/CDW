package org.cdwbackend.service;


import org.cdwbackend.dto.request.AuthenticationRequest;
import org.cdwbackend.dto.response.AuthResponse;
import org.cdwbackend.dto.response.JwtResponse;

public interface IAuthenticationService {
    AuthResponse login(AuthenticationRequest request);

    void logout(String token,String refreshToken);

    JwtResponse refreshToken(String token);

}
