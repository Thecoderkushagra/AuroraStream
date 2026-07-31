package com.TheCoderKushagra.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EpisodeRequest {
    private String title;
    private String description;
    private String seriesId;  // Important: links episode to series
    private Integer episodeNumber;
}