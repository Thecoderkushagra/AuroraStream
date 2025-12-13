package com.TheCoderKushagra.service;

import com.TheCoderKushagra.dto.KafkaObject;
import com.TheCoderKushagra.dto.MovieRequest;
import com.TheCoderKushagra.entity.Genre;
import com.TheCoderKushagra.entity.Movie;
import com.TheCoderKushagra.entity.VideoInfo;
import com.TheCoderKushagra.repository.MovieRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@Slf4j
@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private KafkaTemplate<String, KafkaObject> kafkaTemplate;

    @Value("${path.temp}")
    private String Temp;
    @Value("${path.stream}")
    private String Hls;

    public String saveMovie(MovieRequest metadata, MultipartFile video) {
        if (video.isEmpty()){
            return "no media file found";
        }
        if (!Objects.equals(video.getContentType(), "video/mp4")){
            return "files other than video/mp4 are not allowed. Found: " + video.getContentType();
        }
        try{
            InputStream inputStream = video.getInputStream(); // read video binary

            String uniqueFileId = UUID.randomUUID().toString();
            String videoTitle = video.getOriginalFilename();

            Path videoFilePath = Paths.get(Temp, videoTitle);
            Path hlsFilePath = Paths.get(Hls, uniqueFileId);

            Files.copy(inputStream, videoFilePath, StandardCopyOption.REPLACE_EXISTING);

            VideoInfo videoBuild = VideoInfo.builder()
                    .title(metadata.getTitle())
                    .description(metadata.getDescription())
                    .filePath(videoFilePath.toString())
                    .hlsPath(hlsFilePath.toString())
                    .thumbnailUrl("lol")
                    .durationInMinutes(10)
                    .build();

            Movie movieMetadata = Movie.builder()
                    .videoInfo(videoBuild)
                    .genres(new ArrayList<>(
                            List.of(Genre.ROMANCE, Genre.COMEDY)
                    ))
                    .publisherName(metadata.getPublisherName())
                    .build();

            Movie save = movieRepository.save(movieMetadata);

            KafkaObject kafkaObject = new KafkaObject(save.getId(), save.getVideoInfo().getFilePath());
            log.info("kafka starts");
            kafkaTemplate.send("transcode", kafkaObject);
            log.info("kafka ends");

            return videoTitle + " saved successfully with ID: " + save.getId();
        } catch(IOException e) {
            log.error("Failed to save video or write to disk", e);
            return "error: Failed to process video file.";
        }
    }

}