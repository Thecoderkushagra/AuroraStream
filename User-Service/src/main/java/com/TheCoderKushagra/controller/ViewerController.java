package com.TheCoderKushagra.controller;

import com.TheCoderKushagra.dto.UserRequest;
import com.TheCoderKushagra.dto.ViewerResponse;
import com.TheCoderKushagra.service.ViewerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/viewer")
public class ViewerController {
    @Autowired
    private ViewerService viewerService;

    @PostMapping("/make-viewer")
    public ResponseEntity<ViewerResponse> callSaveViewer(@RequestBody UserRequest request) {
        int viewer = 1;
        ViewerResponse response = viewerService.saveUser(request, 1);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/update-viewer-username")
    public ResponseEntity<ViewerResponse> callUpdateUsername(
            @RequestParam("id") String id,
            @RequestParam("newName") String name
    ) {
        ViewerResponse response = viewerService.changeUsername(id, name);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/update-viewer-password")
    public ResponseEntity<?> callChangePassword() {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete-viewer/{id}")
    public ResponseEntity<String> callDeletedUser(@PathVariable String id) {
        String response = viewerService.deleteUser(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
