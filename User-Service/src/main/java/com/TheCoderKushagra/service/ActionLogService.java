package com.TheCoderKushagra.service;

import com.TheCoderKushagra.entity.UserEntity;
import com.TheCoderKushagra.entity.admin.ActionLogs;
import com.TheCoderKushagra.entity.admin.AdminProfile;
import com.TheCoderKushagra.repository.ActionLogsRepository;
import com.TheCoderKushagra.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ActionLogService {
    @Autowired
    private ActionLogsRepository logsRepository;
    @Autowired
    private UserRepository userRepository;

    // transaction banana hai
    public void addNewLog(String id, String log) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("INVALID ID"));
        ActionLogs newAction = ActionLogs.builder().action(log).build();
        if (user.getAdminProfile() == null) {
            List<ActionLogs> LogList = new ArrayList<>();
            LogList.add(newAction);
            user.setAdminProfile(new AdminProfile(LogList));
        }
        else {
            user.getAdminProfile().getActionsLog().add(newAction);
        }
    }
}
