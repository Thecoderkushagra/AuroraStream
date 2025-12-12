package com.TheCoderKushagra.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "series")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Series {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String serisName;
    private String seriesDesc;

    @Enumerated(EnumType.STRING)
    private List<Genre> genre = new ArrayList<>();

    @OneToMany
    @JoinColumn(name = "episode_id")
    private List<Episode> episodes = new ArrayList<>();
    private int totalEpisodes;
}
