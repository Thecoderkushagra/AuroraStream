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

    private String seriesName;
    private String seriesDesc;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "series_genres", joinColumns = @JoinColumn(name = "series_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "genre")
    private List<Genre> genres = new ArrayList<>();

    private String publisherName;

    @OneToMany(mappedBy = "series", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Episode> episodes = new ArrayList<>();

    private Integer totalEpisodes;
}