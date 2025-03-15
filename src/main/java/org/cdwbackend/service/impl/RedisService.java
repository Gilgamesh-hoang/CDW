package org.cdwbackend.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.cdwbackend.service.IRedisService;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class RedisService implements IRedisService {
    RedisTemplate<String, Object> redisTemplate;
    ObjectMapper objectMapper;

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
    public void setTTL(String key, long timeout, TimeUnit timeUnit) {
        redisTemplate.expire(key, timeout, timeUnit);
    }
}
