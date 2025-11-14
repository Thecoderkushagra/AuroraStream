package com.TheCoderKushagra.service;

import com.TheCoderKushagra.entity.Roles;
import com.TheCoderKushagra.entity.UserEntity;
import com.TheCoderKushagra.entity.admin.ActionLevel;
import com.TheCoderKushagra.entity.admin.ActionLogs;
import com.TheCoderKushagra.entity.admin.AdminProfile;
import com.TheCoderKushagra.repository.ActionLogsRepository;
import com.TheCoderKushagra.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
public class CreateMaster {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ActionLogsRepository actionLogsRepository;

    @PostConstruct
    public void createMasterAdmin() {
        boolean exist = userRepository.existByUserName("Master_Admin_Account");
        if (!exist) {
            ActionLogs action = ActionLogs.builder()
                    .action("THE MASTER IS CREATED AT :" + LocalDateTime.now()).build();
            actionLogsRepository.save(action);
            List<ActionLogs> actionLog= new ArrayList<>();
            actionLog.add(action);

            UserEntity build = UserEntity.builder()
                    .userName("Master_Admin_Account")
                    .email("no-email")
                    .password("admin")
                    .role(Roles.ADMIN)
                    .adminProfile(new AdminProfile(
                            ActionLevel.MASTER,
                            actionLog
                    ))
                    .build();
            UserEntity saved = userRepository.save(build);
            log.info("MASTER-ADMIN IS CREATED WITH USER-ID :{}", saved.getId());
        } else { log.info("MASTER-ADMIN ALREADY EXISTS!"); }
    }

}
