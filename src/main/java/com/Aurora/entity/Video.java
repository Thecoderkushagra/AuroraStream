package com.Aurora.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Video {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String videoId;

    private String title;
    @Column(length = 500)
    private String description;
    private String contentType;
    private String filePath;
}
