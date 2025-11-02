package com.TheCoderKushagra.entity.admin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "admin_action_logs")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class ActionLogs {
    @Id
    private String id;
    private String action;
    private LocalDateTime actedAt = LocalDateTime.now();
}
