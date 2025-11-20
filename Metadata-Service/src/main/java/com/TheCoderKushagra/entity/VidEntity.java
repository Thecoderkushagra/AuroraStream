package com.TheCoderKushagra.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VidEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String videoId;

    private String title;
    @Column(length = 2000)
    private String description;
    private String contentType;
    private String filePath;
}
