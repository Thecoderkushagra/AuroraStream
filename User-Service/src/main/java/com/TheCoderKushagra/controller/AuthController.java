package com.TheCoderKushagra.controller;

import com.TheCoderKushagra.Security.JwtService;
import com.TheCoderKushagra.dto.UserRequest;
import com.TheCoderKushagra.dto.ViewerResponse;
import com.TheCoderKushagra.entity.UserEntity;
import com.TheCoderKushagra.service.ViewerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private ViewerService viewerService;
    @Autowired
    private AuthenticationManager authenticationManager;

    //signup-viewer
    @PostMapping("/make-viewer")
    public ResponseEntity<ViewerResponse> callSaveViewer(@RequestBody UserRequest request) {
        int viewer = 1;
        ViewerResponse response = viewerService.saveUser(request, 1);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //otp-controller =====> right here


    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestParam("userName") String username,
            @RequestParam("password") String password
    ){
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            UserEntity user = viewerService.findUserByName(username);

            String accessToken = jwtService.generateToken(user);
            String refreshToken = jwtService.generateRefreshToken(user);

            return new ResponseEntity<>(
                    Map.of(
                            "accessToken",accessToken,
                            "refreshToken",refreshToken
                    )
                    ,HttpStatus.OK);

        } catch (BadCredentialsException e) {
            log.error("LOGIN ERROR :: BY {}",username);
            return new ResponseEntity<>(Map.of("error", "Invalid credentials"),
                    HttpStatus.UNAUTHORIZED);
        }
    }
}
