package com.TheCoderKushagra.entity;

import jakarta.persistence.*;
import org.springframework.data.annotation.Id;

@Entity
@Table(name = "video_content")
public class VideoContent {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title;

    @Column(length = 2000)
    private String description;

    @Enumerated(EnumType.STRING)
    private ContentType type; // MOVIE or SERIES

    private Integer releaseYear;

    // Only used if MOVIE
    private Integer durationInMinutes;

    private String posterUrl;
    private String bannerUrl;
    private String trailerUrl;

    @ManyToMany
    @JoinTable(
            name = "content_genre_map",
            joinColumns = @JoinColumn(name = "content_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private List<Genre> genres = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "rating_id")
    private ContentRating contentRating;

    // Recommendation / discovery scoreboard
    private Long totalViews = 0L;
    private Double averageRating = 0.0;
    private Long trendingScore = 0L;

    private Boolean isFeatured = false;
    private Boolean isDownloadable = false;
}
