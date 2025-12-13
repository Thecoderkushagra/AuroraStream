package com.TheCoderKushagra.dto;

import com.TheCoderKushagra.entity.Genre;

import java.util.List;

public class MovieResponse {
    private String id;
    private String title;
    private String description;

    private String filePath;
    private String hlsPath;
    private String thumbnailUrl;

    private Integer durationInMinutes;
    private Long totalViews;
    private List<Genre> genre;
}
