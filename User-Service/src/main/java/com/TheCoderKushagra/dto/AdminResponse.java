package com.TheCoderKushagra.dto;

import com.TheCoderKushagra.entity.Roles;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminResponse {
    private String id;
    private String userName;
    private String email;
    public Roles role;
    private List<String> actionsLog;
}
