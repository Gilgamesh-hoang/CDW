package org.cdwbackend.service;


import org.cdwbackend.dto.request.AuthenticationRequest;
import org.cdwbackend.dto.response.JwtResponse;

public interface IAuthenticationService {
    JwtResponse login(AuthenticationRequest request);

//    void logout(String token,String refreshToken);

//    JwtResponse refreshToken(String token);

//    JwtResponse oauth2GoogleLogin(GooglePojo googlePojo);
}
