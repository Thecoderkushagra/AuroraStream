package com.TheCoderKushagra.controller;

import com.TheCoderKushagra.dto.ViewerResponse;
import com.TheCoderKushagra.service.ViewerService;
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
    public ResponseEntity<ViewerResponse> findViewer(@RequestHeader("X-User-Id") Long id) {
        try{
            ViewerResponse viewer = viewerService.getViewer(id);
            return new ResponseEntity<>(viewer, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
