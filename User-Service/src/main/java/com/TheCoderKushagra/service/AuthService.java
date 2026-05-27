package com.TheCoderKushagra.service;

import com.TheCoderKushagra.cache.OtpCache;
import com.TheCoderKushagra.cache.UserCache;
import com.TheCoderKushagra.client.MailClient;
import com.TheCoderKushagra.dto.OtpRequest;
import com.TheCoderKushagra.dto.SignupRequest;
import com.TheCoderKushagra.entity.Viewer;
import com.TheCoderKushagra.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final MailClient mailClient;
    private final UserRepository userRepository;
    private final OtpCache otpCache;
    private final UserCache userCache;
    private final ViewerService viewerService;


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
        sendOtp(request.email(), otp);
        return "OTP SEND SUCCESSFULLY";
    }

    @Async
    public void sendOtp(String to, String otp) {
        mailClient.sendSimpleMail(to, "OTP for Signup",
                "Your OTP for SignUp verification is: " + otp +
                        ". It is valid for only 5 minutes. \n\nDo not share this OTP with anyone.");
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
}
