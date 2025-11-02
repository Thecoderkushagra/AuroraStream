package com.TheCoderKushagra.entity.publisher;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PublisherProfile {
    private String studioName;
    private String websiteUrl;

    private Long totalUploads = 0L;
    private Long totalViewsAcrossContent = 0L;
}
