package com.TheCoderKushagra.controller;

import com.TheCoderKushagra.dto.response.ViewerResponse;
import com.TheCoderKushagra.service.ViewerService;
import com.thecoderkushagra.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/viewer")
@RequiredArgsConstructor
public class ViewerController {

    private final ViewerService viewerService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<ViewerResponse>> findViewer(@RequestHeader("X-User-Id") Long id) {
        ViewerResponse viewer = viewerService.getViewer(id);

        return ResponseEntity.ok(ApiResponse.<ViewerResponse>builder()
            .success(true)
            .message("Viewer profile retrieved successfully")
            .data(viewer)
            .build());
    }
}
