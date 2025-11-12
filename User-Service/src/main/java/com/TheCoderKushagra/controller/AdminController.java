package com.TheCoderKushagra.controller;

import com.TheCoderKushagra.dto.UserRequest;
import com.TheCoderKushagra.dto.ViewerResponse;
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

    // update username

    // update passwd

    // delete

    //=====================================================================

    // create publisher
    @PostMapping("/create-publisher")
    public ResponseEntity<?> callSaveUser(@RequestBody UserRequest request) {
        try {
            ViewerResponse response = userService.saveUser(request, 2);
            return new ResponseEntity<>(response.getUserName()+": PUBLISHER SAVED",HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>("SOME ERROR OCCURRED",HttpStatus.BAD_REQUEST);
        }
    }

    // get all publisher
    @GetMapping("/all-publishers")
    public ResponseEntity<?> callGetAllByRole() {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // delete publisher

    //====================================================================

    // delete viewer
    // get all viewer
    @GetMapping("/all-viewer")
    public ResponseEntity<?> callGetAllViewers() {
        List<?> allByRole = userService.getAllByRole(1);
        return new ResponseEntity<>(allByRole, HttpStatus.OK);
    }

}
