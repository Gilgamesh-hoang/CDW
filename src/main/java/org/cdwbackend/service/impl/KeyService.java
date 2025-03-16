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
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class KeyService implements IKeyService {
    AESEncoder encoder;
    IRedisService redisService;

    @Override
    public KeyPair generateKeyPair() {
        KeyPairGenerator keyPairGenerator = null;
        try {
            keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);
        } catch (NoSuchAlgorithmException e) {
            throw new KeyGenerationException("Failed to generate key pair", e);
        }
        java.security.KeyPair keyPair = keyPairGenerator.generateKeyPair();
        return KeyPair.builder()
                .privateKey(Base64.getEncoder().encodeToString(keyPair.getPrivate().getEncoded()))
                .publicKey(Base64.getEncoder().encodeToString((keyPair.getPublic().getEncoded())))
                .build();
    }

    @Override
    public KeyPair getKeyPairByUser(Long userId) {
        KeyPair key = redisService.getEntryFromMap(RedisKeyUtil.ASYM_KEYPAIR, userId.toString(), KeyPair.class);

        if (key != null) {
            String privateKey = encoder.decode(key.getPrivateKey());
            key.setPrivateKey(privateKey);
            return key;
        } else {
            // Save the key synchronously before returning it
            KeyPair keyPair = generateKeyPair();
            save(keyPair, userId);
            return keyPair;
        }
    }


    @Override
    public void save(KeyPair keyPair, Long userId) {
        String privateKey = encoder.encode(keyPair.getPrivateKey());
        KeyPair key = KeyPair.builder()
                .publicKey(keyPair.getPublicKey())
                .privateKey(privateKey)
                .build();

        HashMap<String, Object> map = new HashMap<>();
        map.put(userId.toString(), key);
        redisService.addEntriesToMap(RedisKeyUtil.ASYM_KEYPAIR, map);
        log.info("Key pair saved for user: {}", userId);
    }

    @Override
    public void deleteAndSave(KeyPair keyPair, Long userId) {
        deleteUserKey(userId);
        save(keyPair, userId);
    }

    @Override
    public void deleteUserKey(Long userId) {
        redisService.deleteEntriesFromMap(RedisKeyUtil.ASYM_KEYPAIR, List.of(userId.toString()));
    }

}
