package org.cdwbackend.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.exception.ResourceNotFoundException;
import org.cdwbackend.service.IKeyService;
import org.cdwbackend.service.impl.UserDetailServiceImpl;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.security.PublicKey;
import java.util.Base64;
import java.util.Date;
import java.util.function.Function;

@Component
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class JwtHelper {
    ObjectMapper objectMapper;
    IKeyService keyService;
    UserDetailServiceImpl detailService;

    /**
     * This method is used to extract all claims from a provided JWT token.
     * The token is parsed using the signing key.
     *
     * @param token The JWT token to extract claims from.
     * @return The extracted claims.
     */
    private Claims extractAllClaims(String token, PublicKey key) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    }

    /**
     * This method is used to extract a specific claim from a provided JWT token.
     * The specific claim to extract is determined by the provided Function.
     *
     * @param token          The JWT token to extract a claim from.
     * @param claimsFunction The Function to determine which claim to extract.
     * @return The extracted claim.
     */
    private <T> T extractClaims(String token, Function<Claims, T> claimsFunction, PublicKey key) {
        final Claims claims = extractAllClaims(token, key);
        return claimsFunction.apply(claims);
    }

    public String getEmailFromToken(String token, PublicKey key) {
        return extractClaims(token, Claims::getSubject, key);
    }

    private String decodeJwtPayload(String jwt) {
        String[] parts = jwt.split("\\.");
        if (parts.length != 3) {
            throw new IllegalArgumentException("Invalid JWT token format.");
        }

        String payload = parts[1];
        byte[] decodedBytes = Base64.getUrlDecoder().decode(payload);
        return new String(decodedBytes);
    }

    public String extractEmailFromPayload(String token) {
        String payload = decodeJwtPayload(token);
        try {
            JsonNode jsonNode = objectMapper.readTree(payload);
            String email = jsonNode.get("sub").asText();
            if (email == null) {
                throw new ResourceNotFoundException("Email not found in token");
            }
            return email;
        } catch (Exception e) {
            throw new ResourceNotFoundException("Failed to parse payload", e);
        }
    }

    public Date getExpiryToken(String token, PublicKey key) {
        return extractClaims(token, Claims::getExpiration, key);
    }


    public String getJidToken(String token, PublicKey key) {
        return extractClaims(token, claims -> claims.get("jid", String.class), key);
    }


}
