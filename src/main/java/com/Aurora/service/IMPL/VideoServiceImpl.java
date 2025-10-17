package com.Aurora.service.IMPL;

import com.Aurora.entity.Video;
import com.Aurora.repository.VideoRepository;
import com.Aurora.service.VideoService;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;

@Slf4j
@Service
public class VideoServiceImpl implements VideoService {

    @Autowired
    private VideoRepository videoRepository;

    String Temp = "TempVideo/";
    String Hls = "HlsVideos/";

    @PostConstruct
    public void Init() throws IOException {
        File file0 = new File(Temp);
        File file1 = new File(Hls);

        if(!file0.exists()){
            boolean mkdir = file0.mkdir();
            log.info("FILE {} CREATED", file0);
        }else {
            log.info("FILE {} ALREADY EXISTS", file0);

        }if(!file1.exists()){
            boolean mkdir = file1.mkdir();
            log.info("FILE CREATED: {}", file1);
        }else {
            log.info("FILE {} ALREADY EXISTS", file1);
        }
    }

    @Override
    public Video saveVideo(Video videoMetadata, MultipartFile video) {
        try{
            String filename = video.getOriginalFilename();
            String contentType = video.getContentType();
            InputStream inputStream = video.getInputStream();

            Path videoFilePath = Paths.get(Temp, filename);
            Files.copy(inputStream, videoFilePath, StandardCopyOption.REPLACE_EXISTING);

            videoMetadata.setContentType(contentType);
            videoMetadata.setFilePath(videoFilePath.toString());

            Video saved = videoRepository.save(videoMetadata);
            process(saved.getVideoId());
            Files.delete(videoFilePath);
            return saved;
        } catch (IOException e) {
            log.error("ERROR:",e);
            return null;

        }
    }

    @Override
    public void process(String videoId) {
        Video video = get(videoId);
        String filePath = video.getFilePath();

        String vid360p = Hls + videoId + "/360p/";
        String vid480p = Hls + videoId + "/480p/";
        String vid720p = Hls + videoId + "/720p/";
        String vid1080p = Hls + videoId + "/1080p/";

        try{
            Files.createDirectories(Paths.get(vid360p));
            Files.createDirectories(Paths.get(vid480p));
            Files.createDirectories(Paths.get(vid720p));
            Files.createDirectories(Paths.get(vid1080p));

            // 360p video builder
            List<String> build360 = Arrays.asList(
                    "ffmpeg", "-i", filePath, "-vf", "scale=640:360",
                    "-c:a", "aac", "-ar", "48000", "-b:a", "96k", "-c:v", "h264", "-b:v", "800k",
                    "-maxrate", "856k", "-bufsize", "1200k", "-hls_time", "10", "-hls_list_size", "0",
                    "-hls_segment_filename", vid360p + "segment_%03d.ts", vid360p + "index.m3u8"
            );
            System.out.println(build360);
            ProcessBuilder pb360 = new ProcessBuilder(build360);
            pb360.redirectErrorStream(true);
            Process process360 = pb360.start();
            int exitCode360 = process360.waitFor();
            log.info("FFmpeg BUILD->360p exited with code {}", exitCode360);
            if (exitCode360 != 0) {
                throw new RuntimeException("FFmpeg failed with exit code: " + exitCode360);
            }

            // 480p video builder
            List<String> build480 = Arrays.asList(
                    "ffmpeg", "-i", filePath, "-vf", "scale=854:480",
                    "-c:a", "aac", "-ar", "48000", "-b:a", "128k", "-c:v", "h264", "-b:v", "1400k",
                    "-maxrate", "1498k", "-bufsize", "2100k", "-hls_time", "10", "-hls_list_size", "0",
                    "-hls_segment_filename", vid480p + "segment_%03d.ts", vid480p + "index.m3u8"
            );
            ProcessBuilder pb480 = new ProcessBuilder(build480);
            pb480.redirectErrorStream(true);
            Process process480 = pb480.start();

            int exitCode480 = process480.waitFor();
            log.info("FFmpeg BUILD->480p exited with code {}", exitCode480);
            if (exitCode480 != 0) {
                throw new RuntimeException("FFmpeg failed with exit code: " + exitCode480);
            }

            // 720p video builder
            List<String> build720 = Arrays.asList(
                    "ffmpeg", "-i", filePath, "-vf", "scale=1280:720",
                    "-c:a", "aac", "-ar", "48000", "-b:a", "128k", "-c:v", "h264", "-b:v", "2800k",
                    "-maxrate", "2996k", "-bufsize", "4200k", "-hls_time", "10", "-hls_list_size", "0",
                    "-hls_segment_filename", vid720p + "segment_%03d.ts", vid720p + "index.m3u8"
            );
            ProcessBuilder pb720 = new ProcessBuilder(build720);
            pb720.redirectErrorStream(true);
            Process process720 = pb720.start();
            int exitCode720 = process720.waitFor();
            log.info("FFmpeg BUILD->720p exited with code {}", exitCode720);
            if (exitCode720 != 0) {
                throw new RuntimeException("FFmpeg failed with exit code: " + exitCode720);
            }

            // 1080p video builder
            List<String> build1080 = Arrays.asList(
                    "ffmpeg", "-i", filePath, "-vf", "scale=1920:1080",
                    "-c:a", "aac", "-ar", "48000", "-b:a", "192k", "-c:v", "h264", "-b:v", "5000k",
                    "-maxrate", "5350k", "-bufsize", "7500k", "-hls_time", "10", "-hls_list_size", "0",
                    "-hls_segment_filename", vid1080p + "segment_%03d.ts", vid1080p + "index.m3u8"
            );
            ProcessBuilder pb1080 = new ProcessBuilder(build1080);
            pb1080.redirectErrorStream(true);
            Process process1080 = pb1080.start();
            int exitCode1080 = process1080.waitFor();
            log.info("FFmpeg BUILD->1080p exited with code {}", exitCode1080);
            if (exitCode1080 != 0) {
                throw new RuntimeException("FFmpeg failed with exit code: " + exitCode1080);
            }

        } catch (IOException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Video get(String videoId) {
        return videoRepository
                .findById(videoId)
                .orElseThrow(() -> new RuntimeException("VIDEO DOSE NOT EXIST"));
    }
}
