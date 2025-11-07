package com.TheCoderKushagra.controller;

import com.TheCoderKushagra.dto.UserRequest;
import com.TheCoderKushagra.dto.ViewerResponse;
import com.TheCoderKushagra.service.ViewerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private ViewerService viewerService;

    //signup-viewer
    @PostMapping("/make-viewer")
    public ResponseEntity<ViewerResponse> callSaveViewer(@RequestBody UserRequest request) {
        int viewer = 1;
        ViewerResponse response = viewerService.saveUser(request, 1);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //otp


    //login
}
