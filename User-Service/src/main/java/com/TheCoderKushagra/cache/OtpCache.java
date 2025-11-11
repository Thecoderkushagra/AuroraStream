package com.TheCoderKushagra.cache;

import com.TheCoderKushagra.entity.UserEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Slf4j
@Component
public class OtpCache {
    @Autowired
    private RedisTemplate<String,String> redisTemplate;

    public boolean setOtp(String key, String value, long timeToLive){
        try{
            redisTemplate.opsForValue().set(key,value,timeToLive, TimeUnit.SECONDS);
            log.info("User cached successfully: {}", key);
            return true;
        } catch (RedisConnectionFailureException e) {
            log.error("Redis connection failed while caching user: {}", key, e);
            return false;
        } catch (Exception e){
            log.error("Unexpected error while caching user: {}", key, e);
            return false;
        }
    }

    public String getOtp(String key, Class<UserEntity> userEntityClass){
        try {
            Object o = redisTemplate.opsForValue().get(key);
            if (o != null){
                return o.toString();
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
