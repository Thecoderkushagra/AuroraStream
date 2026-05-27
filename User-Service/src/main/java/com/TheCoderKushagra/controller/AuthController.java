package com.TheCoderKushagra.controller;

import com.TheCoderKushagra.dto.OtpRequest;
import com.TheCoderKushagra.dto.SignupRequest;
import com.TheCoderKushagra.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signup(@Valid @RequestBody SignupRequest request) {
        try {
            String response = authService.signupUser(request);
            return ResponseEntity.ok(Map.of("Response", response));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("Error", e.getMessage()));
        }
    }

    @PostMapping("/varify-otp")
    public ResponseEntity<Map<String, String>> varify(@RequestBody OtpRequest request) {
        boolean response = authService.verifyOtp(request);
        if (response) {
            return ResponseEntity.ok(Map.of("Response", "SIGNUP SUCCESSFULLY"));
        }
        return ResponseEntity.badRequest().body(Map.of("Error", "WRONG OTP"));
    }

    @PostMapping("/login")
    public String login() {
        return "hello world";
    }

}
