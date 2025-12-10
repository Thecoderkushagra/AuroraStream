package com.TheCoderKushagra.controller;

import com.TheCoderKushagra.entity.VidEntity;
import com.TheCoderKushagra.repository.VidRepository;
import com.TheCoderKushagra.service.VidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/aurora")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class vidController {
    @Autowired
    private VidService vidService;
    @Autowired
    private VidRepository vidRepository;

    @PostMapping("/save")
    public ResponseEntity<VidEntity> save(
            @RequestParam("videoFile") MultipartFile video,
            @RequestParam("title") String title,
            @RequestParam("desc") String desc
    ){
        VidEntity vid = VidEntity.builder()
                .title(title)
                .description(desc)
                .build();
        VidEntity object = vidService.saveVideo(vid, video);
        return new ResponseEntity<>(object, HttpStatus.OK);
    }
}
