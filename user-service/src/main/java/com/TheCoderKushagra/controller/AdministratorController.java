package com.TheCoderKushagra.controller;

import com.thecoderkushagra.common.dto.ApiResponse;
import com.TheCoderKushagra.dto.request.SignupRequest;
import com.TheCoderKushagra.service.AdministratorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/administrator")
@RequiredArgsConstructor
public class AdministratorController {

    private final AdministratorService administratorService;

    @PostMapping("/create-admin")
    public ResponseEntity<ApiResponse<Void>> createAdmin(@Valid @RequestBody SignupRequest request) {
        administratorService.createAdmin(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<Void>builder()
            .success(true)
            .message("Admin created successfully")
            .build());
    }
}
