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
import org.springframework.security.core.context.SecurityContextHolder;
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
    // Generates a JWT response containing access and refresh tokens
    private JwtResponse generateJwtResponse(String email, KeyPair keyPair) throws InterruptedException, ExecutionException {
        // Generate access token asynchronously
        CompletableFuture<String> accessToken = jwtService.generateAccessToken(email, keyPair.getPrivateKey());
        // Generate refresh token asynchronously
        CompletableFuture<String> refreshToken = jwtService.generateRefreshToken(email, keyPair.getPrivateKey());
        // Wait for both tokens to be generated
        CompletableFuture.allOf(accessToken, refreshToken).join();
        // Return the JWT response with the generated tokens and public key
        return new JwtResponse(accessToken.get(), keyPair.getPublicKey(), refreshToken.get());
    }

    // Creates a JWT response for a given email and user ID
    private JwtResponse createResponse(String email, Long userId) {
        // Retrieve the key pair associated with the user
        KeyPair keyPair = keyService.getKeyPairByUser(userId);
        try {
            // Generate and return the JWT response
            return generateJwtResponse(email, keyPair);
        } catch (InterruptedException | ExecutionException e) {
            // Handle exceptions by interrupting the thread and throwing a BadCredentialsException
            Thread.currentThread().interrupt();
            throw new BadCredentialsException("Error while generating token");
        }
    }

    // Authenticates a user and returns a JWT response
    @Override
    public JwtResponse login(AuthenticationRequest request) {
        // Load user details by email
        CustomUserSecurity user = (CustomUserSecurity) userDetailsService.loadUserByUsername(request.getEmail());
        // Authenticate the user with the provided email and password
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        // If authentication is successful, create and return the JWT response
        if (authentication.isAuthenticated()) {
            return createResponse(request.getEmail(), user.getId());
        } else {
            // Throw an exception if authentication fails
            throw new BadCredentialsException("Invalid email or password");
        }
    }

    // Logs out a user by blacklisting their tokens and clearing the security context
    @Override
    public void logout(String token, String refreshToken) {
        // Blacklist the provided access and refresh tokens
        tokenService.blacklistTokens(token, refreshToken);
        // Clear the security context
        SecurityContextHolder.clearContext();
    }
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
