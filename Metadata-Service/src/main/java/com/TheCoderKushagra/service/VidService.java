package com.TheCoderKushagra.service;

import com.TheCoderKushagra.dto.KafkaObject;
import com.TheCoderKushagra.entity.VidEntity;
import com.TheCoderKushagra.repository.VidRepository;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;

@Slf4j
@Service
public class VidService {
    @Autowired
    private VidRepository vidRepository;
    @Autowired
    private KafkaTemplate<String, KafkaObject> kafkaTemplate;

    String Temp = "C:\\Users\\Kushagra\\Videos\\TempVideo\\";
    String Hls = "C:\\Users\\Kushagra\\Videos\\HlsVideos\\";

    @PostConstruct
    public void Init() throws IOException {
        File file0 = new File(Temp);
        File file1 = new File(Hls);

        if(!file0.exists()){
            boolean mkdir = file0.mkdir();
            log.info("FILE {} CREATED", file0);
        }else {
            log.info("FILE {} ALREADY EXISTS", file0);
        }
        if(!file1.exists()){
            boolean mkdir = file1.mkdir();
            log.info("FILE CREATED: {}", file1);
        }else {
            log.info("FILE {} ALREADY EXISTS", file1);
        }
    }

    public VidEntity saveVideo(VidEntity videoMetadata, MultipartFile video) {
        try{
            String filename = video.getOriginalFilename();
            String contentType = video.getContentType();
            InputStream inputStream = video.getInputStream();

            Path videoFilePath = Paths.get(Temp, filename);
            Files.copy(inputStream, videoFilePath, StandardCopyOption.REPLACE_EXISTING);

            videoMetadata.setContentType(contentType);
            videoMetadata.setFilePath(videoFilePath.toString());

            VidEntity saved = vidRepository.save(videoMetadata);
//            process(saved.getVideoId());
//            Files.delete(videoFilePath);
            // ADD A KAFKA TOPIC
            KafkaObject kafkaObject = new KafkaObject(saved.getVideoId(), saved.getFilePath());
            log.info("kafka starts");
            kafkaTemplate.send("transcode", kafkaObject);
            log.info("kafka ends");
            return saved;
        } catch (IOException e) {
            log.error("ERROR:",e);
            return null;
        }
    }

    public void process(String videoId) {
        VidEntity video = getVideoMetadata(videoId);
        String filePath = video.getFilePath();

        String vid360p = Hls + videoId + "\\360p\\";
        String vid480p = Hls + videoId + "\\480p\\";
        String vid720p = Hls + videoId + "\\720p\\";
        String vid1080p = Hls + videoId + "\\1080p\\";

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
                    "-hls_segment_filename", vid360p + "segment_%03d.ts",
                    vid360p + "index.m3u8"
            );
            log.info("Executing 360p command: {}", String.join(" ", build360));
            executeCommand(build360, "360p");

            // 480p video builder
            List<String> build480 = Arrays.asList(
                    "ffmpeg", "-i", filePath, "-vf", "scale=854:480",
                    "-c:a", "aac", "-ar", "48000", "-b:a", "128k", "-c:v", "h264", "-b:v", "1400k",
                    "-maxrate", "1498k", "-bufsize", "2100k", "-hls_time", "10", "-hls_list_size", "0",
                    "-hls_segment_filename", vid480p + "segment_%03d.ts", vid480p + "index.m3u8"
            );
            log.info("Executing 480p command: {}", String.join(" ", build480));
            executeCommand(build480, "480p");

            // 720p video builder
            List<String> build720 = Arrays.asList(
                    "ffmpeg", "-i", filePath, "-vf", "scale=1280:720",
                    "-c:a", "aac", "-ar", "48000", "-b:a", "128k", "-c:v", "h264", "-b:v", "2800k",
                    "-maxrate", "2996k", "-bufsize", "4200k", "-hls_time", "10", "-hls_list_size", "0",
                    "-hls_segment_filename", vid720p + "segment_%03d.ts", vid720p + "index.m3u8"
            );
            log.info("Executing 720p command: {}", String.join(" ", build720));
            executeCommand(build720, "720p");

            // 1080p video builder
            List<String> build1080 = Arrays.asList(
                    "ffmpeg", "-i", filePath, "-vf", "scale=1920:1080",
                    "-c:a", "aac", "-ar", "48000", "-b:a", "192k", "-c:v", "h264", "-b:v", "5000k",
                    "-maxrate", "5350k", "-bufsize", "7500k", "-hls_time", "10", "-hls_list_size", "0",
                    "-hls_segment_filename", vid1080p + "segment_%03d.ts", vid1080p + "index.m3u8"
            );
            log.info("Executing 1080p command: {}", String.join(" ", build1080));
            executeCommand(build1080, "1080p");

            log.info("Video processing completed successfully for videoId: {}", videoId);

        } catch (IOException | InterruptedException e) {
            log.error("Error processing video: {}", videoId, e);
            throw new RuntimeException(e);
        }
    }

    private void executeCommand(List<String> command, String resolution) throws IOException, InterruptedException {
        ProcessBuilder pb = new ProcessBuilder(command);
        pb.redirectErrorStream(true);
        Process process = pb.start();

        // Read output in a separate thread to prevent buffer deadlock
        Thread outputReader = readOutput(resolution, process);
        outputReader.start();

        int exitCode = process.waitFor();
        System.out.println("FFmpeg BUILD->" + resolution + " exited with code " + exitCode);

        if (exitCode != 0) {
            throw new RuntimeException("FFmpeg failed with exit code: " + exitCode + " for resolution: " + resolution);
        }
    }

    private static Thread readOutput(String resolution, Process process) {
        Thread outputReader = new Thread(() -> {
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println("[FFmpeg-" + resolution + "] " + line);
                }
            } catch (IOException e) {
                System.err.println("Error reading FFmpeg output: " + e.getMessage());
            }
        });
        outputReader.setDaemon(true);
        return outputReader;
    }

    public VidEntity getVideoMetadata(String videoId) {
        return vidRepository
                .findById(videoId)
                .orElseThrow(() -> new RuntimeException("VIDEO DOES NOT EXIST"));
    }
}