package com.TheCoderKushagra.service;

import com.TheCoderKushagra.dto.UserRequest;
import com.TheCoderKushagra.dto.ViewerResponse;
import com.TheCoderKushagra.entity.Roles;
import com.TheCoderKushagra.entity.UserEntity;
import com.TheCoderKushagra.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

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
