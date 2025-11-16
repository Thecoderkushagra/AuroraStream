package com.TheCoderKushagra.controller;

import com.TheCoderKushagra.dto.ViewerResponse;
import com.TheCoderKushagra.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/viewer")
public class ViewerController {
    @Autowired
    private UserService userService;

    @PutMapping("/update-viewer-username")
    public ResponseEntity<ViewerResponse> callUpdateUsername(
            @RequestHeader("X-User-Id") String id,
            @RequestParam("newName") String name
    ) {
        ViewerResponse response = userService.changeUsername(id, name);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/update-viewer-password")
    public ResponseEntity<?> callChangePassword(
            @RequestHeader("X-User-Id") String id,
            @RequestParam("password") String password
    ) {
        ViewerResponse response = userService.changePassword(id, password);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete-viewer")
    public ResponseEntity<String> callDeletedUser(@RequestHeader("X-User-Id") String id) {
        String response = userService.deleteUser(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
