package com.TheCoderKushagra.dto;

import com.TheCoderKushagra.entity.Roles;
import com.TheCoderKushagra.entity.admin.ActionLevel;
import com.TheCoderKushagra.entity.admin.ActionLogs;
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
    private ActionLevel actionLevel;
    private List<String> actionsLog;
}
