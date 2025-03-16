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
        redisService.deleteEntriesFromMap(RedisKeyUtil.JWT_BLACKLIST, tokenExpired);
    }

//    @Override
//    @Async
//    @Transactional
//    public CompletableFuture<Void> blacklistAllUserTokens(UUID userId) {
//        List<Token> tokens = tokenRepository.findByUser(User.builder().id(userId).build());
//        HashMap<String, Object> tokenMap = new HashMap<>();
//        tokens.forEach(token -> {
//            // check if token is expired
//            if (!token.getExpireRT().before(new Date())) {
//                TokenDTO refreshObj = TokenDTO.builder()
//                        .expiredDate(new Date(token.getExpireRT().getTime() + REFRESH_TOKEN_LIFETIME))
//                        .build();
//                tokenMap.put(token.getRefreshTokenId().toString(), refreshObj);
//            }
//        });
//        redisProducer.sendSaveMap(RedisKeyUtil.JWT_BLACKLIST, tokenMap);
//        tokenRepository.deleteAllByRefreshTokenIdIn(tokens.stream().map(Token::getRefreshTokenId).toList());
//        return CompletableFuture.completedFuture(null);
//    }
//
//    @Override
//    public void blacklistAllUserTokens(UUID userId, String... exceptToken) {
//        List<Token> tokens = tokenRepository.findByUser(User.builder().id(userId).build());
//        HashMap<String, Object> tokenMap = new HashMap<>();
//        List<UUID> exceptArr = Arrays.stream(exceptToken).map(token ->
//                UUID.fromString(jwtHelper.getJidFromRefreshToken(token))
//        ).toList();
//        List<Token> temp = new ArrayList<>();
//        tokens.forEach(token -> {
//            // check if token is expired
//            if (!token.getExpireRT().before(new Date()) && !exceptArr.contains(token.getRefreshTokenId())) {
//                TokenDTO refreshObj = TokenDTO.builder()
//                        .expiredDate(new Date(token.getExpireRT().getTime() + REFRESH_TOKEN_LIFETIME))
//                        .build();
//                tokenMap.put(token.getRefreshTokenId().toString(), refreshObj);
//                temp.add(token);
//            }
//        });
//        redisProducer.sendSaveMap(RedisKeyUtil.JWT_BLACKLIST, tokenMap);
//        tokenRepository.deleteAllByRefreshTokenIdIn(temp.stream().map(Token::getRefreshTokenId).toList());
//    }


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

//    @Override
//    public TokenDTO getTokenFromBlacklist(String token, boolean isRefreshToken) {
//        String jid;
//        if (isRefreshToken) {
//            jid = jwtHelper.getJidFromRefreshToken(token);
//        } else {
//            jid = jwtHelper.getJidFromAccessToken(token);
//        }
//        return redisService.getEntryFromMap(RedisKeyUtil.JWT_BLACKLIST, jid, TokenDTO.class);
//    }

//    @Override
//    public TokenDTO getTokenFromBlacklist(String jid) {
//        return redisService.getEntryFromMap(RedisKeyUtil.JWT_BLACKLIST, jid, TokenDTO.class);
//    }

//    @Override
//    @Async
//    public CompletableFuture<Void> storeRefreshToken(String refreshToken, UUID userId) {
//        // check if user has 3 refresh token
//        User user = User.builder().id(userId).build();
//        List<Token> tokens = tokenRepository.findByUser(user);
//        if (tokens.size() == 3) {
//            tokens.sort(Comparator.comparing(Token::getExpireRT));
//            Token token = tokens.get(0);
//            // check if token is expired
//            if (!token.getExpireRT().before(new Date())) {
//                TokenDTO refreshObj = TokenDTO.builder()
//                        .expiredDate(token.getExpireRT())
//                        .build();
//                HashMap<String, Object> map = new HashMap<>();
//                map.put(token.getRefreshTokenId().toString(), refreshObj);
//                redisProducer.sendSaveMap(RedisKeyUtil.JWT_BLACKLIST, map);
//            }
//            tokenRepository.delete(token);
//        }
//        Token token = Token.builder()
//                .refreshTokenId(UUID.fromString(jwtHelper.getJidFromRefreshToken(refreshToken)))
//                .user(user)
//                .expireRT(jwtHelper.getRefreshTokenExpiry(refreshToken))
//                .build();
//        tokenRepository.save(token);
//        return CompletableFuture.completedFuture(null);
//    }

//    @Override
//    @Async
//    public CompletableFuture<Void> storeRefreshToken(String oldRT, String newRT) {
//        Token token = tokenRepository.findByRefreshTokenId(UUID.fromString(jwtHelper.getJidFromRefreshToken(oldRT)))
//                .orElseThrow(() -> new NoSuchElementException("Token not found"));
//
//        token.setRefreshTokenId(UUID.fromString(jwtHelper.getJidFromRefreshToken(newRT)));
//        token.setExpireRT(jwtHelper.getRefreshTokenExpiry(newRT));
//        tokenRepository.save(token);
//        return CompletableFuture.completedFuture(null);
//    }
//
//    @Override
//    @Transactional
//    public void removeRefreshToken(String refreshToken) {
//        UUID refreshTokenId = UUID.fromString(jwtHelper.getJidFromRefreshToken(refreshToken));
//        tokenRepository.deleteByRefreshTokenId(refreshTokenId);
//    }


}
