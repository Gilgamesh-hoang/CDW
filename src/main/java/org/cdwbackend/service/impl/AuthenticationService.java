package org.cdwbackend.service.impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.cdwbackend.dto.CustomUserSecurity;
import org.cdwbackend.dto.KeyPair;
import org.cdwbackend.dto.request.AuthenticationRequest;
import org.cdwbackend.dto.response.JwtResponse;
import org.cdwbackend.service.IAuthenticationService;
import org.cdwbackend.service.IKeyService;
import org.cdwbackend.service.IRedisService;
import org.cdwbackend.service.ITokenService;
import org.cdwbackend.util.JwtHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService implements IAuthenticationService {
    AuthenticationManager authenticationManager;
    ITokenService tokenService;
    JwtService jwtService;
    JwtHelper jwtHelper;
    UserDetailServiceImpl userDetailsService;
    IKeyService keyService;
    IRedisService redisService;

    // Method to handle common logic for generating JWT response
    private JwtResponse generateJwtResponse(String email, KeyPair keyPair) throws InterruptedException, ExecutionException {
        CompletableFuture<String> accessToken = jwtService.generateAccessToken(email, keyPair.getPrivateKey());
        CompletableFuture<String> refreshToken = jwtService.generateRefreshToken(email, keyPair.getPrivateKey());
        CompletableFuture.allOf(accessToken, refreshToken).join();
        return new JwtResponse(accessToken.get(), keyPair.getPublicKey(), refreshToken.get());
    }


    private JwtResponse createResponse(String email, Long userId) {
        KeyPair keyPair = keyService.getKeyPairByUser(userId);
        try {
            return generateJwtResponse(email, keyPair);
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new BadCredentialsException("Error while generating token");
        }
    }

    @Override
    public JwtResponse login(AuthenticationRequest request) {
        CustomUserSecurity user = (CustomUserSecurity) userDetailsService.loadUserByUsername(request.getEmail());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        if (authentication.isAuthenticated()) {
            return createResponse(request.getEmail(), user.getId());
        } else {
            throw new BadCredentialsException("Invalid email or password");
        }
    }


//    @Override
//    public void logout(String token, String refreshToken) {
//        tokenService.blacklistTokens(token, refreshToken);
//        SecurityContextHolder.clearContext();
//    }
//
//    @Override
//    public JwtResponse refreshToken(String token) {
//        String email = jwtHelper.getEmailFromRefreshToken(token);
//        if (email == null) {
//            throw new BadCredentialsException("Invalid refresh token");
//        }
//        CustomUserSecurity user = (CustomUserSecurity) userDetailsService.loadUserByUsername(email);
//        KeyPair keyPair = keyService.getKeyPairByUser(user.getId());
//        boolean isValid = jwtService.validateRefreshToken(token, keyPair.getPublicKeyRT());
//        if (!isValid) {
//            throw new BadCredentialsException("Invalid refresh token");
//        }
//        try {
//            JwtResponse jwtResponse = generateJwtResponse(user.getEmail(), keyPair);
//            tokenService.storeRefreshToken(token, jwtResponse.getRefreshToken());
//            tokenService.blacklistRefreshToken(token);
//
//            // Save last refresh token used
//            redisProducer.sendSaveMap(RedisKeyUtil.LAST_REFRESH_TOKEN, Map.of(user.getId(), new Timestamp(System.currentTimeMillis())));
//            return jwtResponse;
//        } catch (InterruptedException | ExecutionException e) {
//            Thread.currentThread().interrupt();
//            throw new BadCredentialsException("Error while generating token");
//        }
//    }

}
