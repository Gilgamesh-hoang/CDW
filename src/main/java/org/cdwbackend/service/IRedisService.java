package org.cdwbackend.service;

import java.util.List;
import java.util.concurrent.TimeUnit;

public interface IRedisService {

    <T> void saveList(String key, List<T> list);

    <T> List<T> getList(String key, Class<T> clazz);

    void setTTL(String key, long timeout, TimeUnit timeUnit);

}
