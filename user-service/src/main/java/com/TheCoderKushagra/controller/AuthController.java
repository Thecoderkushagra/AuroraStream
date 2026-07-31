package com.TheCoderKushagra.controller;

import com.TheCoderKushagra.dto.request.LoginRequest;
import com.TheCoderKushagra.dto.request.OtpRequest;
import com.TheCoderKushagra.dto.request.RefreshTokenRequest;
import com.TheCoderKushagra.dto.request.SignupRequest;
import com.TheCoderKushagra.service.AuthService;
import com.thecoderkushagra.common.dto.ApiResponse;
import jakarta.validation.Valid;
import jakarta.ws.rs.BadRequestException;
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
    public ResponseEntity<ApiResponse<String>> signup(@Valid @RequestBody SignupRequest request) {
        String response = authService.signupUser(request);
        return ResponseEntity.ok(ApiResponse.<String>builder()
            .success(true)
            .message("Signup initiated")
            .data(response)
            .build());
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse<Void>> verifyOtp(@RequestBody OtpRequest request) {
        boolean response = authService.verifyOtp(request);
        if (!response) {
            throw new BadRequestException("WRONG OR EXPIRED OTP");
        }
        return ResponseEntity.ok(ApiResponse.<Void>builder()
            .success(true)
            .message("SIGNUP SUCCESSFULLY")
            .build());
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<ApiResponse<Void>> resendOtp(@RequestParam("username") String username) {
        authService.resendOtp(username);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
            .success(true)
            .message("RESEND SUCCESSFULLY")
            .build());
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Map<String, String>>> login(@RequestBody LoginRequest request) {
        Map<String, String> tokens = authService.authenticateAndGenerateToken(request);
        return ResponseEntity.ok(ApiResponse.<Map<String, String>>builder()
            .success(true)
            .message("Login successful")
            .data(tokens)
            .build());
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<Map<String, String>>> refresh(@RequestBody RefreshTokenRequest request) {
        Map<String, String> tokens = authService.refreshAuthToken(request.refreshToken());
        return ResponseEntity.ok(ApiResponse.<Map<String, String>>builder()
            .success(true)
            .message("Token refreshed successfully")
            .data(tokens)
            .build());
    }
}
