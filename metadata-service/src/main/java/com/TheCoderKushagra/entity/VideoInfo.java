package com.TheCoderKushagra.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.time.LocalDateTime;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VideoInfo {
    private String title;

    @Column(length = 2000)
    private String description;

    private String filePath;
    private String hlsPath;
    private String thumbnailUrl;

    private Integer durationInMinutes;

    @Builder.Default
    private Long totalViews = 0L;

    @Builder.Default
    private LocalDateTime uploadDate = LocalDateTime.now();
}