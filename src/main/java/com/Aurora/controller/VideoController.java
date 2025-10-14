package com.Aurora.controller;

import com.Aurora.entity.Video;
import com.Aurora.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/video")
public class VideoController {
    @Autowired
    private VideoService videoService;

    @PostMapping
    public ResponseEntity<Video> save(@RequestParam("videoFile")MultipartFile video,
                                      @RequestParam("title") String title,
                                      @RequestParam("desc") String desc
                                      ){
        Video vid = Video.builder()
                .title(title)
                .description(desc)
                .build();

        Video object = videoService.saveVideo(vid, video);
        return new ResponseEntity<>(object, HttpStatus.OK);
    }
}
