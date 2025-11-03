package com.TheCoderKushagra.service;

import com.TheCoderKushagra.dto.UserRequest;
import com.TheCoderKushagra.dto.ViewerResponse;
import com.TheCoderKushagra.entity.Roles;
import com.TheCoderKushagra.entity.UserEntity;
import com.TheCoderKushagra.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ViewerService {
    @Autowired
    private UserRepository userRepository;

    public ViewerResponse saveViewer(UserRequest request) {
        UserEntity entity = UserEntity.builder()
                .userName(request.getUserName())
                .email(request.getEmail())
                .password(request.getPassword())
                .role(Roles.VIEWER)
                .build();
        UserEntity saved = userRepository.save(entity);
        return ViewerResponse.builder()
                .id(saved.getId())
                .userName(saved.getUserName())
                .email(saved.getEmail())
                .role(saved.getRole())
                .build();
    }

    public ViewerResponse changeUsername(String id, String newName) {
        UserEntity entity = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("invalid id:" + id + "user dose not exist"));
        entity.setUserName(newName);
        UserEntity saved = userRepository.save(entity);
        return ViewerResponse.builder()
                .id(saved.getId())
                .userName(saved.getUserName())
                .email(saved.getEmail())
                .role(saved.getRole())
                .build();
    }

    public UserEntity changePassword() {
        // add BCript before this
        return null;
    }

    public String deleteUser(String id) {
        boolean exists = userRepository.existsById(id);
        if (exists) {
            userRepository.deleteById(id);
            log.info("DELETED USER WITH ID: {}", id);
            return "USER DELETED";
        } else {
            log.error("USER WITH ID: {} DONE NOT EXIST", id);
            return "USER DOSE NOT EXIST";
        }
    }
}
