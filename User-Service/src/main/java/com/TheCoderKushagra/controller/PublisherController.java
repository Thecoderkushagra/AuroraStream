package com.TheCoderKushagra.controller;

import com.TheCoderKushagra.dto.ViewerResponse;
import com.TheCoderKushagra.entity.UserEntity;
import com.TheCoderKushagra.entity.publisher.PublisherProfile;
import com.TheCoderKushagra.repository.UserRepository;
import com.TheCoderKushagra.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/publisher")
public class PublisherController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @PutMapping("/update-pub-username")
    public ResponseEntity<ViewerResponse> callUpdateUsername(
            @RequestHeader("X-User-Id") String id,
            @RequestParam("newName") String name
    ) {
        ViewerResponse response = userService.changeUsername(id, name);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/update-pub-password")
    public ResponseEntity<?> callChangePassword(
            @RequestHeader("X-User-Id") String id,
            @RequestParam("password") String password
    ) {
        try{
            ViewerResponse response = userService.changePassword(id, password);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @DeleteMapping("/delete-pub")
    public ResponseEntity<String> callDeletedUser(@RequestHeader("X-User-Id") String id) {
        String response = userService.deleteUser(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/update-all")
    public ResponseEntity<String> updateAll(
            @RequestHeader("X-User-Id") String id,
            @RequestParam("studioName") String stdName,
            @RequestParam("webName") String webName
    ) {
        UserEntity user = userService.getById(id);
        if (user.getPublisherProfile() == null) {
            PublisherProfile pp = new PublisherProfile();
            user.setPublisherProfile(pp);
        }
        user.getPublisherProfile().setStudioName(stdName);
        user.getPublisherProfile().setWebsiteUrl(webName);
        userRepository.save(user);
        return new ResponseEntity<>("Updated", HttpStatus.OK);
    }

    //==================
    // EXTERNAL CALLS
    //==================
    @GetMapping("/get/studioName")
    public ResponseEntity<String> getStudioName(@RequestParam("userId") String id) {
        UserEntity user = userService.getById(id);
        if (user.getPublisherProfile() == null){
            return new ResponseEntity<>("Invalid id", HttpStatus.BAD_REQUEST);
        }
        String studioName = user.getPublisherProfile().getStudioName();
        return new ResponseEntity<>(studioName, HttpStatus.OK);
    }
}
