package org.cdwbackend.service.impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.cdwbackend.dto.KeyPair;
import org.cdwbackend.exception.KeyGenerationException;
import org.cdwbackend.service.IKeyService;
import org.cdwbackend.service.IRedisService;
import org.cdwbackend.util.AESEncoder;
import org.cdwbackend.util.RedisKeyUtil;
import org.springframework.stereotype.Service;

import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class KeyService implements IKeyService {
    AESEncoder encoder;
    IRedisService redisService;

    @Override
    // Generates a new RSA key pair
    public KeyPair generateKeyPair() {
        KeyPairGenerator keyPairGenerator = null;
        try {
            // Initialize the key pair generator with RSA algorithm and 2048-bit key size
            keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);
        } catch (NoSuchAlgorithmException e) {
            // Throw a custom exception if the key pair generation fails
            throw new KeyGenerationException("Failed to generate key pair", e);
        }
        // Generate the key pair
        java.security.KeyPair keyPair = keyPairGenerator.generateKeyPair();
        // Return the key pair with encoded private and public keys
        return KeyPair.builder()
                .privateKey(Base64.getEncoder().encodeToString(keyPair.getPrivate().getEncoded()))
                .publicKey(Base64.getEncoder().encodeToString((keyPair.getPublic().getEncoded())))
                .build();
    }

    @Override
    // Retrieves the key pair associated with a specific user
    public KeyPair getKeyPairByUser(Long userId) {
        // Get the key pair from Redis using the user ID
        KeyPair key = redisService.getEntryFromMap(RedisKeyUtil.ASYM_KEYPAIR, userId.toString(), KeyPair.class);

        if (key != null) {
            // Decode the private key if the key pair exists
            String privateKey = encoder.decode(key.getPrivateKey());
            key.setPrivateKey(privateKey);
            return key;
        } else {
            // Generate and save a new key pair if it does not exist
            KeyPair keyPair = generateKeyPair();
            save(keyPair, userId);
            return keyPair;
        }
    }

    @Override
    // Saves the key pair for a specific user
    public void save(KeyPair keyPair, Long userId) {
        // Encode the private key before saving
        String privateKey = encoder.encode(keyPair.getPrivateKey());
        KeyPair key = KeyPair.builder()
                .publicKey(keyPair.getPublicKey())
                .privateKey(privateKey)
                .build();

        // Create a map to store the key pair with the user ID as the key
        HashMap<String, Object> map = new HashMap<>();
        map.put(userId.toString(), key);
        // Add the key pair to Redis
        redisService.addEntriesToMap(RedisKeyUtil.ASYM_KEYPAIR, map);
        // Log the key pair saving action
        log.info("Key pair saved for user: {}", userId);
    }

}
