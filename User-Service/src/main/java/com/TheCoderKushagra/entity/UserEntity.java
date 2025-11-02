package com.TheCoderKushagra.entity;

import com.TheCoderKushagra.entity.admin.AdminProfile;
import com.TheCoderKushagra.entity.publisher.PublisherProfile;
import com.TheCoderKushagra.entity.viewer.ViewerProfile;
import lombok.*;
import org.springframework.data.annotation.Id;
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

    private String email;
    private String password;

    public Roles role;

    private ViewerProfile profile;
    private PublisherProfile publisherProfile;
    private AdminProfile adminProfile;

    private LocalDateTime createdAt = LocalDateTime.now();
}
