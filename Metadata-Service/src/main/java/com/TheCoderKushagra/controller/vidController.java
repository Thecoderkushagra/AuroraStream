package com.TheCoderKushagra.controller;

import com.TheCoderKushagra.dto.MovieRequest;
import com.TheCoderKushagra.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/aurora")
@CrossOrigin(origins = "*")
public class vidController {
    @Autowired
    private MovieService movieService;

    @PostMapping("/movie")
    public ResponseEntity<String> savePuri(
            @RequestParam("videoFile") MultipartFile video,
            @RequestParam("title") String title,
            @RequestParam("desc") String desc
    ){
        MovieRequest build = MovieRequest.builder()
                .title(title)
                .description(desc)
                .build();
        String s = movieService.saveMovie(build, video);
        return new ResponseEntity<>(s, HttpStatus.OK);
    }

    @GetMapping("/health-check")
    public ResponseEntity<String> lol(){
        return new ResponseEntity<>("path is working", HttpStatus.OK);
    }
}
