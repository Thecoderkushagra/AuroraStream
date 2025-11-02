package com.TheCoderKushagra.entity.viewer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class WatchHistory {
    @Id
    private String id;

    private String userId;
    private String contentId;
    private String episodeId;

    private Integer progressInSeconds;
    private LocalDateTime lastWatchedAt = LocalDateTime.now();
}
