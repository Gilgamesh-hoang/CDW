package org.cdwbackend.service;



public interface ITokenService {

    void removeExpiredTokens();

    void blacklistTokens(String accessToken, String refreshToken);

    void blacklistTokens(long userId, String accessToken, String refreshToken);

}
