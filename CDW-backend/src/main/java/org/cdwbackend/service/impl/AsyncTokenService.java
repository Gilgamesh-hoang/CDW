package org.cdwbackend.service.impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.service.IRedisService;
import org.cdwbackend.util.JwtHelper;
import org.cdwbackend.util.RedisKeyUtil;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.security.PublicKey;
import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AsyncTokenService {
    JwtHelper jwtHelper;
    JwtService jwtService;
    IRedisService redisService;

    @Async
    // Asynchronously blacklists an access token for a specific user
    public CompletableFuture<Void> blacklistAccessToken(String accessToken, String publicKeyBase64) {
        // Get the public key from the key pair
        PublicKey publicKey = jwtService.getPublicKeyFromBase64String(publicKeyBase64);

        // Get the expiration date of the access token
        Date expiredDate = jwtHelper.getExpiryToken(accessToken, publicKey);
        // Get the unique identifier (JID) of the access token
        String accessId = jwtHelper.getJidToken(accessToken, publicKey);

        // Create a map to store the access token ID and its expiration date
        HashMap<String, Object> map = new HashMap<>();
        map.put(accessId, expiredDate);

        // Add the access token ID and expiration date to the JWT blacklist in Redis
        redisService.addEntriesToMap(RedisKeyUtil.JWT_BLACKLIST, map);
        // Return a completed future
        return CompletableFuture.completedFuture(null);
    }

    @Async
    // Asynchronously blacklists a refresh token for a specific user
    public CompletableFuture<Void> blacklistRefreshToken(String refreshToken, String publicKeyBase64) {
        // Get the public key from the key pair
        PublicKey publicKey = jwtService.getPublicKeyFromBase64String(publicKeyBase64);

        // Get the expiration date of the refresh token
        Date expiredDate = jwtHelper.getExpiryToken(refreshToken, publicKey);
        // Get the unique identifier (JID) of the refresh token
        String refreshId = jwtHelper.getJidToken(refreshToken, publicKey);

        // Define the duration to extend the expiration date by 2 days
        Duration days = Duration.ofDays(2);

        // Create a map to store the refresh token ID and its extended expiration date
        HashMap<String, Object> map = new HashMap<>();
        map.put(refreshId, new Date(expiredDate.getTime() + days.toMillis()));

        // Add the refresh token ID and extended expiration date to the JWT blacklist in Redis
        redisService.addEntriesToMap(RedisKeyUtil.JWT_BLACKLIST, map);
        // Return a completed future
        return CompletableFuture.completedFuture(null);
    }
}
