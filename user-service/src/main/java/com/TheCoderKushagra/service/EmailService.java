package com.TheCoderKushagra.service;

import com.thecoderkushagra.common.client.MailClient;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final MailClient mailClient;

    @Async
    public void sendOtp(String to, String otp) {
        mailClient.sendSimpleMail(to, "OTP for Signup",
                "Your OTP for SignUp verification is: " + otp +
                        ". It is valid for only 5 minutes. \n\nDo not share this OTP with anyone.");
    }
}
