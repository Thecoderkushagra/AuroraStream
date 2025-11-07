package com.TheCoderKushagra.Security;

import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;

@Component
public class JwtService {
    @Value("secret.key")
    private String SecretKey;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(SecretKey.getBytes());
    }


}
