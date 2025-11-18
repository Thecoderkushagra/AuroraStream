package com.TheCoderKushagra.service;

import com.TheCoderKushagra.entity.UserEntity;
import com.TheCoderKushagra.entity.admin.ActionLogs;
import com.TheCoderKushagra.entity.admin.AdminProfile;
import com.TheCoderKushagra.repository.ActionLogsRepository;
import com.TheCoderKushagra.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ActionLogService {
    @Autowired
    private ActionLogsRepository logsRepository;
    @Autowired
    private UserRepository userRepository;

    // transaction banana hai
    public void addNewLog(String id, String log) {
        UserEntity user = userRepository.findById(id).orElseThrow(()-> new RuntimeException("INVALID ID"));
        if (user.getAdminProfile() == null) {
            user.setAdminProfile(new AdminProfile(new ArrayList<>()));
        }
        ActionLogs newAction = ActionLogs.builder()
                .action(log)
                .build();
        ActionLogs saved = logsRepository.save(newAction);
        user.getAdminProfile().getActionsLog().add(saved);
        userRepository.save(user);
    }
}
