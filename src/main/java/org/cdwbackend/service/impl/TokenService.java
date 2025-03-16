package org.cdwbackend.service.impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.cdwbackend.dto.CustomUserSecurity;
import org.cdwbackend.dto.TokenDTO;
import org.cdwbackend.service.IRedisService;
import org.cdwbackend.service.ITokenService;
import org.cdwbackend.util.JwtHelper;
import org.cdwbackend.util.RedisKeyUtil;
import org.cdwbackend.util.UserSecurityHelper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TokenService implements ITokenService {
    @Value("${jwt.refresh_token.duration}")
    @NonFinal
    long REFRESH_TOKEN_LIFETIME;
    JwtHelper jwtHelper;
    IRedisService redisService;
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
    public void blacklistTokens(String accessToken, String refreshToken) {
        CustomUserSecurity currentUser = UserSecurityHelper.getCurrentUser();
        if (!StringUtils.isBlank(accessToken))
            asyncTokenService.blacklistAccessToken(accessToken, currentUser.getId());

        if (!StringUtils.isBlank(refreshToken))
            asyncTokenService.blacklistRefreshToken(refreshToken, currentUser.getId());
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
