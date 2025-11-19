package com.TheCoderKushagra.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "episode")
public class Episode {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "season_id", nullable = false)
    private Season season;

    private String title;
    private Integer episodeNumber;
    private Integer durationInMinutes;

    private String videoUrl;
}

