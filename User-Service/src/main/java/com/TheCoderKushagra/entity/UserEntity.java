package com.TheCoderKushagra.entity;

import com.TheCoderKushagra.entity.admin.AdminProfile;
import com.TheCoderKushagra.entity.publisher.PublisherProfile;
import com.TheCoderKushagra.entity.viewer.ViewerProfile;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "users")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {
    @Id
    private String id;

    @Indexed(unique = true)
    private String userName;
    @Indexed(unique = true)
    private String email;
    private String password;

    public Roles role;

    private ViewerProfile viewerProfile;
    private PublisherProfile publisherProfile;
    private AdminProfile adminProfile;

    private LocalDateTime createdAt = LocalDateTime.now();
}
