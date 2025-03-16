package org.cdwbackend.service;


import org.cdwbackend.dto.TokenDTO;

public interface ITokenService {

    void removeExpiredTokens();

    void blacklistTokens(String accessToken, String refreshToken);

}
