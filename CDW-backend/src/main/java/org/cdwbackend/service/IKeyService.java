package org.cdwbackend.service;

import org.cdwbackend.dto.KeyPair;

public interface IKeyService {
    KeyPair generateKeyPair();

    KeyPair getKeyPairByUser(Long userId);


    void save(KeyPair keyPair, Long userId);

//    void deleteAndSave(KeyPair keyPair, Long userId);
//
//    void deleteUserKey(Long userId);
}
