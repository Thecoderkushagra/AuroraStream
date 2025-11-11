package com.TheCoderKushagra.cache;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Slf4j
@Component
public class UserCache {
    @Autowired
    private RedisTemplate<String,String> redisTemplate;

    public boolean setUser(String key, Object value, long timeToLive){
        try{
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonValue = objectMapper.writeValueAsString(value);
            redisTemplate.opsForValue().set(key,jsonValue,timeToLive, TimeUnit.SECONDS);
            return true;
        }catch (RedisConnectionFailureException e) {
            log.error("Redis connection failed while caching user: {}", key, e);
            return false;
        } catch (Exception e){
            log.error("Unexpected error while caching user: {}", key, e);
            return false;
        }
    }

    public <T> T getUser(String key, Class<T> userClass){
        try {
            Object data = redisTemplate.opsForValue().get(key);
            ObjectMapper mapper = new ObjectMapper();
            if (data != null) {
                return mapper.readValue(data.toString(), userClass);
            } else {
                log.info("No Value found with key: {}", key);
                return null;
            }
        } catch (RedisConnectionFailureException e) {
            log.error("Redis connection failed while retrieving user: {}", key, e);
            return null;
        } catch (Exception e) {
            log.error("Unexpected error while retrieving user: {}", key, e);
            return null;
        }
    }
}
