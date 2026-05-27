package com.TheCoderKushagra.service;

import com.TheCoderKushagra.dto.SignupRequest;
import com.TheCoderKushagra.entity.enums.Role;
import com.TheCoderKushagra.entity.User;
import com.TheCoderKushagra.entity.Viewer;
import com.TheCoderKushagra.repository.UserRepository;
import com.TheCoderKushagra.repository.ViewerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ViewerService {

    private final ViewerRepository viewerRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void createViewer(SignupRequest request) {
        User user = User.builder()
                .username(request.username())
                .password(passwordEncoder.encode(request.password()))
                .email(request.email())
                .role(Role.ROLE_VIEWER)
                .build();

        Viewer viewer = Viewer.builder()
                .user(user)
                .build();

        viewerRepository.save(viewer);
    }
}
