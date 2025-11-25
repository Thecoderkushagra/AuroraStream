package com.TheCoderKushagra.stream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/videoPlayer")
@CrossOrigin("*")
public class StreamController {
    @Value("${video.hls}")
    private String HLS;

    // Stream M3U8 playlist
    @GetMapping("/{id}/{resolution}/playlist.m3u8")
    public ResponseEntity<?> getPlaylist(
            @PathVariable String id,
            @PathVariable String resolution
    ) {
        try {
            Path playlistPath = Paths.get(HLS, id, resolution, "index.m3u8");
            if (!Files.exists(playlistPath)) {
                return ResponseEntity.notFound().build();
            }
            byte[] content = Files.readAllBytes(playlistPath);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, "application/vnd.apple.mpegurl")
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline")
                    .body(content);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error reading playlist: " + e.getMessage());
        }
    }

    // Stream TS segment
    @GetMapping("/{id}/{resolution}/{segmentName}")
    public ResponseEntity<?> getSegment(
            @PathVariable String id,
            @PathVariable String segmentName,
            @PathVariable String resolution
    ) {
        try {
            Path segmentPath = Paths.get(HLS, id, resolution, segmentName)
                    .getParent()
                    .resolve(segmentName);
            if (!Files.exists(segmentPath)) {
                return ResponseEntity.notFound().build();
            }
            byte[] content = Files.readAllBytes(segmentPath);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, "video/mp2t")
                    .header(HttpHeaders.CONTENT_LENGTH, String.valueOf(content.length))
                    .body(content);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error reading segment: " + e.getMessage());
        }
    }
}
