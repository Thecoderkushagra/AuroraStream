package com.TheCoderKushagra.service;

import com.TheCoderKushagra.dto.SignupRequest;
import com.TheCoderKushagra.dto.ViewerResponse;
import com.TheCoderKushagra.entity.enums.Role;
import com.TheCoderKushagra.entity.User;
import com.TheCoderKushagra.entity.Viewer;
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
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

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

    public ViewerResponse getViewer(Long userId) {
        Viewer viewer = viewerRepository.findByUserIdWithUser(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id " + userId));
        User user = viewer.getUser();

        return ViewerResponse.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .accountStatus(user.getAccountStatus())
                // Watch Statistics
                .totalWatchTime(viewer.getTotalWatchTime())
                .videosWatched(viewer.getVideosWatched())
                .myList(viewer.getMyList())
                // Subscription Summary
                .currentPlan(viewer.getCurrentPlan())
                .planStatus(viewer.getPlanStatus())
                .renewalDate(viewer.getRenewalDate())
                // Playback Preferences
                .autoPlayNext(viewer.isAutoPlayNext())
                .defaultVidQuality(viewer.getDefaultVidQuality())
                // Notifications & Recommendations
                .notification(viewer.isNotifications())
                .subscriptionRenewalReminders(viewer.isSubscriptionRenewalReminders())
                .recommendation(viewer.isRecommendation())
                .build();
    }
}
