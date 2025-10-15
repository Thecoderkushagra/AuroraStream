package com.Aurora.service;

import com.Aurora.entity.Video;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface VideoService {
    Video saveVideo(Video videoMetadata, MultipartFile video);

    Video get(String videoId);
}