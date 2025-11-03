package com.TheCoderKushagra.dto;

import com.TheCoderKushagra.entity.Roles;
import lombok.*;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ViewerResponse {
    private String id;
    private String userName;
    private String email;
    public Roles role;
    private String avatarUrl;
    private List<String> viewerList;
    private List<String> watchHistory;
}
