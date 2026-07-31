package com.TheCoderKushagra.service;

import com.TheCoderKushagra.dto.request.SignupRequest;
import com.TheCoderKushagra.dto.response.ViewerResponse;
import com.TheCoderKushagra.entity.enums.Role;
import com.TheCoderKushagra.entity.User;
import com.TheCoderKushagra.entity.Viewer;
import com.TheCoderKushagra.mapper.EntityMapper;
import com.TheCoderKushagra.repository.ViewerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ViewerService {
    private final ViewerRepository viewerRepository;
    private final EntityMapper entityMapper;

    @Transactional
    public void createViewer(SignupRequest request) {
        User user = entityMapper.toViewerUser(request);
        Viewer viewer = entityMapper.toViewer(user);

        viewerRepository.save(viewer);
    }

    public ViewerResponse getViewer(Long userId) {
        Viewer viewer = viewerRepository.findByUserIdWithUser(userId)
            .orElseThrow(() -> new RuntimeException("User not found with id " + userId));

        return entityMapper.toViewerResponse(viewer);
    }
}
