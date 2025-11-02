package com.TheCoderKushagra.entity.viewer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.List;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class ViewerProfile {
    private String fullName;
    private String avatarUrl;
    private String preferredLanguage;
    @DBRef
    private List<ViewerList> viewerList;
    @DBRef
    private List<WatchHistory> watchHistory;
}
