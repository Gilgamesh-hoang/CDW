package org.cdwbackend.service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

public interface IRedisService {

    <T> void saveList(String key, List<T> list);

    <T> List<T> getList(String key, Class<T> clazz);

    void setTTL(String key, long timeout, TimeUnit timeUnit);

    <V> V getEntryFromMap(String key, String hashKey, Class<V> clazzValue);

    void addEntriesToMap(String key, Map<String, Object> map);

    void deleteEntriesFromMap(String key, List<String> hashKeys);

    <K, V> Map<K, V> getMap(String key, Class<K> clazzKey, Class<V> clazzValue);
}
