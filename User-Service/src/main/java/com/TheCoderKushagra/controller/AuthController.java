package com.TheCoderKushagra.controller;

import com.TheCoderKushagra.dto.LoginRequest;
import com.TheCoderKushagra.dto.OtpRequest;
import com.TheCoderKushagra.dto.SignupRequest;
import com.TheCoderKushagra.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        return ResponseEntity.badRequest().body(Map.of("Error", "WRONG OR EXPIRED OTP"));
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<Map<String, String>> resendOtp(@RequestParam("username") String request) {
        authService.resendOtp(request);
        return ResponseEntity.ok(Map.of("Response", "RESEND SUCCESSFULLY"));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
        try {
            Map<String, String> response = authService.authenticateAndGenerateToken(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("Error", "Invalid credentials."));
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<Map<String, String>> refresh(@RequestBody OtpRequest request) {
        try{
            return ResponseEntity.badRequest().body(Map.of("Error", "BAD REQUEST"));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("Error", "BAD REQUEST"));
        }
    }
}
