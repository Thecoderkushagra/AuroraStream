package com.TheCoderKushagra.service;

import com.TheCoderKushagra.dto.EpisodeRequest;
import com.TheCoderKushagra.dto.KafkaObject;
import com.TheCoderKushagra.entity.Episode;
import com.TheCoderKushagra.entity.Series;
import com.TheCoderKushagra.entity.VideoInfo;
import com.TheCoderKushagra.repository.EpisodeRepository;
import com.TheCoderKushagra.repository.SeriesRepository;
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
import java.util.Objects;
import java.util.UUID;

@Slf4j
@Service
public class EpisodeService {
    @Autowired
    private EpisodeRepository episodeRepository;
    @Autowired
    private SeriesRepository seriesRepository;
    @Autowired
    private KafkaTemplate<String, KafkaObject> kafkaTemplate;

    @Value("${path.temp}")
    private String Temp;
    @Value("${path.stream}")
    private String Hls;

    public String saveEpisode(EpisodeRequest metadata, MultipartFile video) {
        if (video.isEmpty()) {
            return "no media file found";
        }
        if (!Objects.equals(video.getContentType(), "video/mp4")) {
            return "files other than video/mp4 are not allowed. Found: " + video.getContentType();
        }

        try {
            // Find the series this episode belongs to
            Series series = seriesRepository.findById(metadata.getSeriesId())
                    .orElseThrow(() -> new RuntimeException("Series not found with ID: " + metadata.getSeriesId()));

            InputStream inputStream = video.getInputStream();

            String uniqueFileId = UUID.randomUUID().toString();
            String videoTitle = video.getOriginalFilename();

            Path videoFilePath = Paths.get(Temp, videoTitle);
            Path hlsFilePath = Paths.get(Hls, uniqueFileId);

            // Create directories if they don't exist
            Files.createDirectories(videoFilePath.getParent());
            Files.createDirectories(hlsFilePath);

            Files.copy(inputStream, videoFilePath, StandardCopyOption.REPLACE_EXISTING);

            VideoInfo videoBuild = VideoInfo.builder()
                    .title(metadata.getTitle())
                    .description(metadata.getDescription())
                    .filePath(videoFilePath.toString())
                    .hlsPath(hlsFilePath.toString())
                    .thumbnailUrl("lol") // TODO: Generate or accept from request
                    .durationInMinutes(10) // TODO: Extract actual duration from video
                    .build();

            Episode episode = Episode.builder()
                    .videoInfo(videoBuild)
                    .episodeNumber(metadata.getEpisodeNumber())
                    .series(series)
                    .build();

            Episode savedEpisode = episodeRepository.save(episode);

            // Update series total episodes count
            series.setTotalEpisodes(series.getEpisodes().size());
            seriesRepository.save(series);

            // Send to Kafka for transcoding
            KafkaObject kafkaObject = new KafkaObject(
                    savedEpisode.getId(),
                    savedEpisode.getVideoInfo().getFilePath()
            );

            log.info("Sending episode {} to Kafka for transcoding", savedEpisode.getId());
            kafkaTemplate.send("transcode", kafkaObject);
            log.info("Episode sent to Kafka successfully");

            return videoTitle + " saved successfully with ID: " + savedEpisode.getId();

        } catch (IOException e) {
            log.error("Failed to save video or write to disk", e);
            return "error: Failed to process video file.";
        } catch (RuntimeException e) {
            log.error("Error saving episode", e);
            return "error: " + e.getMessage();
        }
    }
}