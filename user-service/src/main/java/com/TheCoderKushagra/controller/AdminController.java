package com.TheCoderKushagra.controller;

import com.thecoderkushagra.common.dto.ApiResponse;
import com.TheCoderKushagra.dto.request.SignupRequest;
import com.TheCoderKushagra.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/create-creator")
    public ResponseEntity<ApiResponse<Void>> createCreator(@Valid @RequestBody SignupRequest request) {
        adminService.createCreator(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<Void>builder()
            .success(true)
            .message("Creator created successfully")
            .build());
    }
}
