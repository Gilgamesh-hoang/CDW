package org.cdwbackend.service;



public interface ITokenService {

    void removeExpiredTokens();

    void blacklistTokens(String accessToken, String refreshToken);

}
