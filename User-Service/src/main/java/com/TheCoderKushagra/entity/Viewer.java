package com.TheCoderKushagra.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "viewers", schema = "user_schema")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Viewer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "viewer_seq_gen")
    @SequenceGenerator(name = "viewer_seq_gen", sequenceName = "viewer_db_sequence", allocationSize = 1)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // --- Watch summary ---
    @Builder.Default
    private Long totalWatchTime = 0L;
    @Builder.Default
    private int videosWatched = 0;
    @Builder.Default
    private int myList = 0;

    // --- SUBSCRIPTION SUMMARY ---
    @Builder.Default
    private String currentPlan = "Free";
    @Builder.Default
    private String planStatus = "Active";
    private LocalDateTime renewalDate;

    // --- Playback Preference ---
    @Builder.Default
    private boolean autoPlayNext = false;
    @Builder.Default
    private String defaultVidQuality = "480";

    // --- Notification ---
    @Builder.Default
    private boolean notifications = true;
    @Builder.Default
    private boolean subscriptionRenewalReminders = true;

    // --- Recommendations ---
    @Builder.Default
    private boolean recommendation = false;

}
