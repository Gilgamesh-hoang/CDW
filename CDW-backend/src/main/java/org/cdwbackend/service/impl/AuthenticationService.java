package org.cdwbackend.service.impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.cdwbackend.dto.CustomUserSecurity;
import org.cdwbackend.dto.KeyPair;
import org.cdwbackend.dto.request.AuthenticationRequest;
import org.cdwbackend.dto.response.AuthResponse;
import org.cdwbackend.dto.response.JwtResponse;
import org.cdwbackend.service.*;
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
    IUserService userService;

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
        return new JwtResponse(accessToken.get(), refreshToken.get());
    }

    // Creates a JWT response for a given email and user ID
    private AuthResponse createResponse(String email, Long userId) {
        // Retrieve the key pair associated with the user
        KeyPair keyPair = keyService.getKeyPairByUser(userId);
        try {
            // Generate and return the JWT response
            JwtResponse jwt = generateJwtResponse(email, keyPair);

            return AuthResponse.builder()
                    .accessToken(jwt.getToken())
                    .refreshToken(jwt.getRefreshToken())
                    .user(userService.getUserById(userId))
                    .build();

        } catch (InterruptedException | ExecutionException e) {
            // Handle exceptions by interrupting the thread and throwing a BadCredentialsException
            Thread.currentThread().interrupt();
            throw new BadCredentialsException("Error while generating token");
        }
    }

    // Authenticates a user and returns a JWT response
    @Override
    public AuthResponse login(AuthenticationRequest request) {
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

    @Override
    // Refreshes the JWT token using the provided refresh token
    public JwtResponse refreshToken(String token) {
        // Extract email from the token payload
        String email = jwtHelper.extractEmailFromPayload(token);
        if (email == null) {
            // Throw an exception if the email is not found in the token
            throw new BadCredentialsException("Invalid refresh token");
        }

        // Load user details by email
        CustomUserSecurity user = (CustomUserSecurity) userDetailsService.loadUserByUsername(email);
        // Retrieve the key pair associated with the user
        KeyPair keyPair = keyService.getKeyPairByUser(user.getId());
        // Validate the provided token using the user's public key
        boolean isValid = jwtService.validateToken(token, keyPair.getPublicKey());
        if (!isValid) {
            // Throw an exception if the token is invalid
            throw new BadCredentialsException("Invalid refresh token");
        }

        try {
            // Generate a new JWT response with access and refresh tokens
            JwtResponse jwtResponse = generateJwtResponse(user.getEmail(), keyPair);
            // Blacklist the old refresh token
            tokenService.blacklistTokens(null, token);

            // Return the new JWT response
            return jwtResponse;
        } catch (InterruptedException | ExecutionException e) {
            // Handle exceptions by interrupting the thread and throwing a BadCredentialsException
            Thread.currentThread().interrupt();
            throw new BadCredentialsException("Error while generating token");
        }
    }

}
