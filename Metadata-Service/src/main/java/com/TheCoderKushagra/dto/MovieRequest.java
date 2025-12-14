package com.TheCoderKushagra.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MovieRequest {
    private String title;
    private String description;

    private String filePath;
    private String hlsPath;
    private String thumbnailUrl;

    private Integer durationInMinutes;
    private String publisherName;
}
