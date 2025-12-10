package com.TheCoderKushagra.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VideoInfo {
    private String title;
    @Column(length = 2000)
    private String description;

    @Enumerated(EnumType.STRING)
    private List<Genre> genre = new ArrayList<>();

    private String filePath;
    private String hlsPath;
    private String thumbnailUrl;

    private Integer durationInMinutes;
    private Long totalViews = 0L;

    private LocalDateTime uploadDate = LocalDateTime.now();
}
