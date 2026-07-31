package com.TheCoderKushagra.service;

import com.TheCoderKushagra.entity.User;
import com.TheCoderKushagra.entity.enums.Role;
import com.TheCoderKushagra.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CreateAdministrator {
    private final UserRepository userRepository;
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostConstruct
    public void createAdministrator() {
        boolean exists = userRepository.existsByUsername("Administrator");
        if (!exists) {
            userRepository.save(User.builder()
                            .username("Administrator")
                            .email("kushagraiskai@gmail.com")
                            .role(Role.ROLE_ADMINISTRATOR)
                            .password(passwordEncoder.encode("admin123"))
                            .build());
            log.info("Administrator has been created");
        } else {
            log.info("Administrator already exists");
        }
    }



}
