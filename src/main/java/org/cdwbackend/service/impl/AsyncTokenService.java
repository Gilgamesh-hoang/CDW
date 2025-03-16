package org.cdwbackend.service.impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.dto.KeyPair;
import org.cdwbackend.service.IKeyService;
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
    IKeyService keyService;

    @Async
    public CompletableFuture<Void> blacklistAccessToken(String accessToken, long userId) {
        KeyPair keyPair = keyService.getKeyPairByUser(userId);
        PublicKey publicKey = jwtService.getPublicKeyFromBase64String(keyPair.getPublicKey());

        Date expiredDate = jwtHelper.getExpiryToken(accessToken, publicKey);
        String accessId = jwtHelper.getJidToken(accessToken, publicKey);

        HashMap<String, Object> map = new HashMap<>();
        map.put(accessId, expiredDate);

        redisService.addEntriesToMap(RedisKeyUtil.JWT_BLACKLIST, map);
        return CompletableFuture.completedFuture(null);
    }

    @Async
    public CompletableFuture<Void> blacklistRefreshToken(String refreshToken, long userId) {
        KeyPair keyPair = keyService.getKeyPairByUser(userId);
        PublicKey publicKey = jwtService.getPublicKeyFromBase64String(keyPair.getPublicKey());

        Date expiredDate = jwtHelper.getExpiryToken(refreshToken, publicKey);
        String refreshId = jwtHelper.getJidToken(refreshToken, publicKey);

        Duration days = Duration.ofDays(2);

        HashMap<String, Object> map = new HashMap<>();
        map.put(refreshId, new Date(expiredDate.getTime() + days.toMillis()));

        redisService.addEntriesToMap(RedisKeyUtil.JWT_BLACKLIST, map);
        return CompletableFuture.completedFuture(null);
    }
}
