package com.TheCoderKushagra.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "creators", schema = "user_schema")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Creator {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "creator_seq_gen")
    @SequenceGenerator(name = "creator_seq_gen", sequenceName = "creator_db_sequence", allocationSize = 1)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Builder.Default
    private String description = null;
    @Builder.Default
    private String profilePhoto = null;
    @Builder.Default
    private String profileBanner = null;
    @Builder.Default
    private String youtubeLink = null;
    @Builder.Default
    private String instagramLink = null;
    @Builder.Default
    private String twitterLink = null;
    @Builder.Default
    private int followers = 0;
    @Builder.Default
    private int videos = 0;
    @Builder.Default
    private int views = 0;
}
