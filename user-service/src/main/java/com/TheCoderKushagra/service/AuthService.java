package com.TheCoderKushagra.service;

import com.TheCoderKushagra.cache.OtpCache;
import com.TheCoderKushagra.cache.UserCache;
import com.TheCoderKushagra.dto.request.LoginRequest;
import com.TheCoderKushagra.dto.request.OtpRequest;
import com.TheCoderKushagra.dto.request.SignupRequest;
import com.TheCoderKushagra.entity.User;
import com.TheCoderKushagra.repository.UserRepository;
import com.TheCoderKushagra.security.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final OtpCache otpCache;
    private final UserCache userCache;
    private final ViewerService viewerService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final EmailService emailService;

    public String signupUser(SignupRequest request) {
        if (userRepository.existsByUsername(request.username())) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(request.email())) {
            throw new RuntimeException("Email already exists");
        }

        String otp = generateSixDigitNumber();

        boolean uc = userCache.setUser(request.username(), request, 300);
        boolean oc = otpCache.setOtp(request.username() + "otp", otp, 300);

        if (!uc || !oc) {
            log.warn("Failed to cache data for user: {}. UserCached: {}, OtpCached: {}", request.username(), uc, oc);
            throw new RuntimeException("Failed to cache data");
        }
        emailService.sendOtp(request.email(), otp);
        return "OTP SEND SUCCESSFULLY";
    }

    public String generateSixDigitNumber() {
        StringBuilder uuidDigitsOnly = new StringBuilder(UUID.randomUUID().toString().replaceAll("[^0-9]", ""));
        while (uuidDigitsOnly.length() < 6) {
            uuidDigitsOnly.append(UUID.randomUUID().toString().replaceAll("[^0-9]", ""));
        }
        return uuidDigitsOnly.substring(0, 6);
    }

    public boolean verifyOtp(OtpRequest request) {
        String redisOtp = otpCache.getOtp(request.username() + "otp");
        if (redisOtp.equals(request.otp())) {
            viewerService.createViewer(userCache.getUser(request.username(), SignupRequest.class));
            return true;
        }
        return false;
    }

    public void resendOtp(String username) {
        String redisOtp = otpCache.getOtp(username + "otp");
        SignupRequest user = userCache.getUser(username, SignupRequest.class);
        emailService.sendOtp(user.email(), redisOtp);
    }

    public Map<String, String> authenticateAndGenerateToken(LoginRequest request) {
        try {
            Authentication authenticate = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.username(), request.password()));
            User user = (User) authenticate.getPrincipal();
            String tokenJwt = jwtService.generateJwtToken(user);
            String tokenRefresh = jwtService.generateRefreshToken(user);

            return Map.of("jwt", tokenJwt, "refresh", tokenRefresh);
        } catch (org.springframework.security.core.AuthenticationException e) {
            log.warn("Authentication failed for user: {}. Reason: {}", request.username(), e.getMessage());
            throw new RuntimeException("Invalid username or password");
        } catch (Exception e) {
            log.error("Unexpected error during authentication for user: {}", request.username(), e);
            throw new RuntimeException("Authentication error: " + e.getMessage());
        }
    }

    public Map<String, String> refreshAuthToken(String refreshToken) {
        String username = jwtService.extractUsername(refreshToken);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!jwtService.isRefreshTokenValid(refreshToken, user)) {
            throw new RuntimeException("Invalid or expired refresh token");
        }

        String newJwtToken = jwtService.generateJwtToken(user);

        return Map.of("jwt", newJwtToken);
    }

}
