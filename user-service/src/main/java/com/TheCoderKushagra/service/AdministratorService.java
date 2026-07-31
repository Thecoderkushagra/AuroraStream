package com.TheCoderKushagra.service;

import com.TheCoderKushagra.dto.request.SignupRequest;
import com.TheCoderKushagra.entity.User;
import com.TheCoderKushagra.entity.enums.AccountStatus;
import com.TheCoderKushagra.entity.enums.Role;
import com.TheCoderKushagra.mapper.EntityMapper;
import com.TheCoderKushagra.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdministratorService {
    private final EntityMapper entityMapper;
    private final UserRepository userRepository;

    @Transactional
    public void createAdmin(SignupRequest request) {
        if (userRepository.existsByUsername(request.username())) {
            throw new IllegalArgumentException("Username already exists: " + request.username());
        }
        if (userRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Email already exists: " + request.email());
        }

        User admin = entityMapper.toAdminUser(request);
        userRepository.save(admin);

        log.info("Admin created successfully with username: {}", request.username());
    }
}
