package com.TheCoderKushagra.dto;

import com.TheCoderKushagra.entity.Roles;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PublisherResponse {
    private String id;
    private String userName;
    private String email;
    public Roles role;
    private String studioName;
    private String websiteUrl;
    private Long totalUploads;
    private Long totalViewsAcrossContent;
}
