package com.TheCoderKushagra.controller;

import com.TheCoderKushagra.cache.OtpCache;
import com.TheCoderKushagra.cache.UserCache;
import com.TheCoderKushagra.security.JwtService;
import com.TheCoderKushagra.dto.UserRequest;
import com.TheCoderKushagra.dto.ViewerResponse;
import com.TheCoderKushagra.entity.UserEntity;
import com.TheCoderKushagra.service.UserService;
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
    private UserService userService;
    @Autowired
    private UserCache userCache;
    @Autowired
    private OtpCache otpCache;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody UserRequest request) {
        String userName = request.getUserName();
        String otp = userService.generateSixDigitNumber();
        boolean uc = userCache.setUser(userName, request, 300);
        boolean oc = otpCache.setOtp(userName + "otp", otp, 300);
        if (!uc || !oc) {
            log.warn("Failed to cache data for user: {}. UserCached: {}, OtpCached: {}",
                    userName, uc, oc);
            return new ResponseEntity<>("Unable to connect to REDIS",HttpStatus.CONFLICT);
        }
        //send mail -> mail service
        return new ResponseEntity<>("YOUR RESPONSE STORED SUCCESSFULLY",HttpStatus.OK);
    }

    @PostMapping("/otp")
    public ResponseEntity<?> otp(
            @RequestParam("Name") String name,
            @RequestParam("OTP") String otp
    ){
        int viewer = 1; // save code of viewer is 1
        String redisOtp = otpCache.getOtp(name + "otp", UserEntity.class);
        if (otp.equals(redisOtp)) {
            UserRequest userData = userCache.getUser(name, UserRequest.class);
            userService.saveUser(userData, viewer);
            return new ResponseEntity<>("SIGNUP SUCCESSFULLY!",HttpStatus.OK);
        } else {
            return new ResponseEntity<>("WRONG OTP",HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestParam("userName") String username,
            @RequestParam("password") String password
    ){
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            UserEntity user = userService.findUserByName(username);

            String accessToken = jwtService.generateToken(user);
            String refreshToken = jwtService.generateRefreshToken(user);

            return new ResponseEntity<>(
                    Map.of( "accessToken",accessToken,
                            "refreshToken",refreshToken )
                    ,HttpStatus.OK);

        } catch (BadCredentialsException e) {
            log.error("LOGIN ERROR :: BY {}",username);
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }
    }
}
