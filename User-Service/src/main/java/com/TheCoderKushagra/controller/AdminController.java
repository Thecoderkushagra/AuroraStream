package com.TheCoderKushagra.controller;

import com.TheCoderKushagra.dto.UserRequest;
import com.TheCoderKushagra.dto.ViewerResponse;
import com.TheCoderKushagra.entity.Roles;
import com.TheCoderKushagra.entity.UserEntity;
import com.TheCoderKushagra.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private UserService userService;

    @PostMapping("update-admin-username")
    public ResponseEntity<?> callUpdateName(
            @RequestParam("id") String id,
            @RequestParam("newName") String name
    ) {
        ViewerResponse response = userService.changeUsername(id, name);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/update-admin-password")
    public ResponseEntity<?> callChangePassword(
            @RequestParam("id") String id,
            @RequestParam("password") String password
    ) {
        ViewerResponse response = userService.changePassword(id, password);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete-admin/{id}")
    public ResponseEntity<String> callDeletedUser(@PathVariable String id) {
        String response = userService.deleteUser(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //=====================================================================

    // create publisher
    @PostMapping("/create-publisher")
    public ResponseEntity<?> callSaveUser(@RequestBody UserRequest request) {
        try {
            ViewerResponse response = userService.saveUser(request, 2);
            return new ResponseEntity<>(response.getUserName()+": PUBLISHER SAVED", HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>("SOME ERROR OCCURRED", HttpStatus.BAD_REQUEST);
        }
    }

    // get all publisher
    @GetMapping("/all-publishers")
    public ResponseEntity<?> callGetAllByRole() {
        List<?> allByRole = userService.getAllByRole(2);
        return new ResponseEntity<>(allByRole, HttpStatus.OK);
    }

    // delete publisher
    @DeleteMapping("/delete-this-pub/{id}")
    public ResponseEntity<String> deletePublisher(@PathVariable String id) {
        UserEntity user = userService.getById(id);
        if (user.getRole() == Roles.PUBLISHER) {
            String s = userService.deleteUser(id);
            return new ResponseEntity<>(s, HttpStatus.OK);
        }
        return new ResponseEntity<>(user.getUserName()+": is not a publisher", HttpStatus.OK);
    }

    //====================================================================

    // get all viewer
    @GetMapping("/all-viewer")
    public ResponseEntity<?> callGetAllViewers() {
        List<?> allByRole = userService.getAllByRole(1);
        return new ResponseEntity<>(allByRole, HttpStatus.OK);
    }

    // delete viewer
    @DeleteMapping("/delete-this-viewer/{id}")
    public ResponseEntity<String> deleteViewer(@PathVariable String id) {
        UserEntity user = userService.getById(id);
        if (user.getRole() == Roles.VIEWER) {
            String s = userService.deleteUser(id);
            return new ResponseEntity<>(s, HttpStatus.OK);
        }
        return new ResponseEntity<>(user.getUserName()+": is not a viewer", HttpStatus.OK);
    }
}
