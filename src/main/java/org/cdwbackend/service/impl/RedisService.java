package org.cdwbackend.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.cdwbackend.service.IRedisService;
import org.springframework.data.redis.connection.StringRedisConnection;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class RedisService implements IRedisService {
    RedisTemplate<String, Object> redisTemplate;
    ObjectMapper objectMapper;

    @Override
    public <T> T getValue(String key, Class<T> clazz) {
        Object data = redisTemplate.opsForValue().get(key);
        // Convert data from JSON (String) to the desired type
        if (data == null) {
            return null;
        }
        if (data instanceof Map<?, ?>) {
            data = objectMapper.convertValue(data, clazz);
            return (T) data;
        }
        return clazz.cast(data);
    }

    @Override
    public <T> void saveValue(String key, T value) {
        redisTemplate.opsForValue().set(key, value);
    }

    @Override
    public <T> void saveList(String key, List<T> list) {
        if (StringUtils.isBlank(key) || list == null || list.isEmpty()) {
            return;
        }
        for (T item : list) {
            redisTemplate.opsForList().rightPush(key, item);
        }
    }


    @Override
    public <T> List<T> getList(String key, Class<T> clazz) {
        // check key is exist
        if (Boolean.FALSE.equals(redisTemplate.hasKey(key))) {
            return null;
        }
        List<Object> data = redisTemplate.opsForList().range(key, 0, -1);
        if (data == null || data.isEmpty()) {
            return new ArrayList<>();
        }
        return data.stream().map(item -> objectMapper.convertValue(item, clazz)).toList();
    }

    @Override
    public void addEntriesToMap(String key, Map<String, Object> map) {
        redisTemplate.opsForHash().putAll(key, map);
    }

    @Override
    public void deleteEntriesFromMap(String key, List<String> hashKeys) {
        redisTemplate.executePipelined((RedisCallback<Object>) connection -> {
            StringRedisConnection stringRedisConn = (StringRedisConnection) connection;
            for (String field : hashKeys) {
                stringRedisConn.hDel(key, field);
            }
            return null;
        });
    }

    @Override
    public <K, V> Map<K, V> getMap(String key, Class<K> clazzKey, Class<V> clazzValue) {
        Map<Object, Object> entries = redisTemplate.opsForHash().entries(key);
        Map<K, V> results = new HashMap<>();
        entries.forEach((k, v) -> {
            results.put(objectMapper.convertValue(k, clazzKey), objectMapper.convertValue(v, clazzValue));
        });
        return results;
    }

    @Override
    public <V> V getEntryFromMap(String key, String hashKey, Class<V> clazzValue) {
        Object data = redisTemplate.opsForHash().get(key, hashKey);
        if (data == null) {
            return null;
        }
        // Convert data from JSON (String) to the desired type
        return objectMapper.convertValue(data, clazzValue);
    }


    @Override
    public void setTTL(String key, long timeout, TimeUnit timeUnit) {
        redisTemplate.expire(key, timeout, timeUnit);
    }

    @Override
    public void deleteByPattern(String pattern) {
        Set<String> keys = redisTemplate.keys(pattern);
        if (keys != null && !keys.isEmpty()) {
            redisTemplate.delete(keys);
        }
    }
}
