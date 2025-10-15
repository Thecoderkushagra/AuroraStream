package com.Aurora.service.IMPL;

import com.Aurora.entity.Video;
import com.Aurora.repository.VideoRepository;
import com.Aurora.service.VideoService;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Slf4j
@Service
public class VideoServiceImpl implements VideoService {

    @Autowired
    private VideoRepository videoRepository;

    @PostConstruct
    public void Init() {
        File file = new File("myVideoPlace/");
        if(!file.exists()){
            file.mkdir();
            log.info("FILE CREATED");
        }else {
            log.info("FILE ALREADY EXISTS");
        }
    }

    @Override
    public Video saveVideo(Video videoMetadata, MultipartFile video) {
        try{
            String filename = video.getOriginalFilename();
            String contentType = video.getContentType();
            InputStream inputStream = video.getInputStream();

            Path videoFilePath = Paths.get("myVideoPlace/", filename);
            Files.copy(inputStream, videoFilePath, StandardCopyOption.REPLACE_EXISTING);

            videoMetadata.setContentType(contentType);
            videoMetadata.setFilePath(videoFilePath.toString());
            return videoRepository.save(videoMetadata);
        } catch (IOException e) {
            log.error("ERROR:",e);
            return null;

        }
    }

    @Override
    public Video get(String videoId) {
        return videoRepository
                .findById(videoId)
                .orElseThrow(() -> new RuntimeException("VIDEO DOSE NOT EXIST"));
    }
}
