package com.TheCoderKushagra.service;

import com.TheCoderKushagra.dto.KafkaObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

@Slf4j
@Service
public class TranscodeVideo {
//    String Hls = "C:\\Users\\Kushagra\\Videos\\HlsVideos\\";
    @Value("${video.hls}")
    private String Hls;

    @KafkaListener(topics = "transcode")
    public void process(KafkaObject kafkaObject, Acknowledgment ack) {
        String filePath = kafkaObject.getFilePath();
        String videoId = kafkaObject.getVideoId();

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

            ack.acknowledge();
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
}
