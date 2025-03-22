package org.cdwbackend.service.impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.cdwbackend.dto.CustomUserSecurity;
import org.cdwbackend.dto.KeyPair;
import org.cdwbackend.exception.UnauthorizedActionException;
import org.cdwbackend.service.IKeyService;
import org.cdwbackend.service.IRedisService;
import org.cdwbackend.service.ITokenService;
import org.cdwbackend.util.RedisKeyUtil;
import org.cdwbackend.util.UserSecurityHelper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TokenService implements ITokenService {
    JwtService jwtService;
    IRedisService redisService;
    IKeyService keyService;
    AsyncTokenService asyncTokenService;

    @Override
    public void removeExpiredTokens() {
        List<String> tokenExpired = new ArrayList<>();
        redisService.getMap(RedisKeyUtil.JWT_BLACKLIST, UUID.class, Date.class).forEach((key, value) -> {
            // check token expired
            if (value.before(new Date())) {
                tokenExpired.add(key.toString());
            }
        });

        if(!tokenExpired.isEmpty())
            redisService.deleteEntriesFromMap(RedisKeyUtil.JWT_BLACKLIST, tokenExpired);
    }


    @Override
    // Blacklists the provided access and refresh tokens for the current user
    public void blacklistTokens(String accessToken, String refreshToken) {
        // Retrieve the current user from the security context
        CustomUserSecurity currentUser = UserSecurityHelper.getCurrentUser();
        // Retrieve the key pair associated with the current user
        KeyPair keyPair = keyService.getKeyPairByUser(currentUser.getId());

        // Validate the provided refresh token using the user's public key
        if (!jwtService.validateToken(refreshToken, keyPair.getPublicKey())) {
            // Throw an exception if the refresh token is invalid
            throw new UnauthorizedActionException("Invalid refresh token");
        }

        // Asynchronously blacklist the provided access token
        asyncTokenService.blacklistAccessToken(accessToken, keyPair.getPublicKey());
        // Asynchronously blacklist the provided refresh token
        asyncTokenService.blacklistRefreshToken(refreshToken, keyPair.getPublicKey());
    }


}
