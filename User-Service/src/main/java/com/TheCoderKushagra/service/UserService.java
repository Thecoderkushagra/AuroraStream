package com.TheCoderKushagra.service;

import com.TheCoderKushagra.dto.AdminResponse;
import com.TheCoderKushagra.dto.PublisherResponse;
import com.TheCoderKushagra.dto.UserRequest;
import com.TheCoderKushagra.dto.ViewerResponse;
import com.TheCoderKushagra.entity.Roles;
import com.TheCoderKushagra.entity.UserEntity;
import com.TheCoderKushagra.repository.CustomQuery;
import com.TheCoderKushagra.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CustomQuery customQuery;

    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ViewerResponse saveUser(UserRequest request, int role) {
        Roles myRole = switch (role) {
            case 1 -> Roles.VIEWER;
            case 2 -> Roles.PUBLISHER;
            case 3 -> Roles.ADMIN;
            default -> throw new IllegalStateException("Unexpected value: " + role);
        };
        UserEntity entity = UserEntity.builder()
                .userName(request.getUserName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(
                        request.getPassword()))
                .role(myRole)
                .build();
        UserEntity saved = userRepository.save(entity);
        return ViewerResponse.builder()
                .id(saved.getId())
                .userName(saved.getUserName())
                .email(saved.getEmail())
                .role(saved.getRole())
                .build();
    }

    public UserEntity findUserByName(String username){
        return userRepository.findByUserName(username)
                .orElseThrow(() -> new RuntimeException("User not found!!"));
    }

    public List<?> getAllByRole(int role) {
        List<UserEntity> allList = customQuery.getAll(role);
        if (allList.isEmpty()) return Collections.singletonList("List is empty");
        if (role == 1){
            List<ViewerResponse> viewerList = new ArrayList<>();
            for (UserEntity ent : allList) {
                viewerList.add(ViewerResponse.builder()
                        .id(ent.getId())
                        .userName(ent.getUserName())
                        .email(ent.getEmail())
                        .role(ent.getRole())
                        .avatarUrl(ent.getViewerProfile() != null ?
                                ent.getViewerProfile().getAvatarUrl(): null)
                        .build()
                );
            }
            return viewerList;
        } else if (role == 2) {
            List<PublisherResponse> pubList = new ArrayList<>();
            for (UserEntity ent : allList) {
                pubList.add(PublisherResponse.builder()
                        .id(ent.getId())
                        .userName(ent.getUserName())
                        .email(ent.getEmail())
                        .role(ent.getRole())
                        .studioName(ent.getPublisherProfile() != null ?
                                ent.getPublisherProfile().getStudioName() : null)
                        .websiteUrl(ent.getPublisherProfile() != null ?
                                ent.getPublisherProfile().getWebsiteUrl() : null)
                        .build());
            }
            return pubList;
        } else if (role == 3) {
            List<AdminResponse> adminList = new ArrayList<>();
            for (UserEntity ent : allList) {
                adminList.add(AdminResponse.builder()
                        .id(ent.getId())
                        .userName(ent.getUserName())
                        .email(ent.getEmail())
                        .role(ent.getRole())
                        .actionLevel(ent.getAdminProfile() != null ?
                                ent.getAdminProfile().getActionLevel() : null)
                        .build());
            }
            return adminList;
        }
        return null;
    }

    public String generateSixDigitNumber() {
        StringBuilder uuidDigitsOnly = new StringBuilder(UUID.randomUUID().toString().replaceAll("[^0-9]", ""));
        while (uuidDigitsOnly.length() < 6) {
            uuidDigitsOnly.append(UUID.randomUUID().toString().replaceAll("[^0-9]", ""));
        }
        return uuidDigitsOnly.substring(0, 6);
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

    public ViewerResponse changePassword(String id, String password) {
        UserEntity entity = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("invalid id:" + id + "user dose not exist"));
        entity.setPassword(passwordEncoder.encode(password));
        UserEntity saved = userRepository.save(entity);
        return ViewerResponse.builder()
                .id(saved.getId())
                .userName(saved.getUserName())
                .email(saved.getEmail())
                .role(saved.getRole())
                .build();
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
