package com.TheCoderKushagra.mapper;

import com.TheCoderKushagra.dto.request.SignupRequest;
import com.TheCoderKushagra.dto.response.ViewerResponse;
import com.TheCoderKushagra.entity.User;
import com.TheCoderKushagra.entity.Viewer;
import com.TheCoderKushagra.entity.enums.AccountStatus;
import com.TheCoderKushagra.entity.enums.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EntityMapper {

    private final PasswordEncoder passwordEncoder;

    public User toAdminUser(SignupRequest request) {
        return User.builder()
            .username(request.username())
            .email(request.email())
            .password(passwordEncoder.encode(request.password()))
            .role(Role.ROLE_ADMIN)
            .accountStatus(AccountStatus.ACTIVE)
            .build();
    }

    public User toCreatorUser(SignupRequest request) {
        return User.builder()
            .username(request.username())
            .email(request.email())
            .password(passwordEncoder.encode(request.password()))
            .role(Role.ROLE_CREATOR)
            .accountStatus(AccountStatus.ACTIVE)
            .build();
    }

    public User toViewerUser(SignupRequest request) {
        return User.builder()
            .username(request.username())
            .password(passwordEncoder.encode(request.password()))
            .email(request.email())
            .role(Role.ROLE_VIEWER)
            .build();
    }

    public Viewer toViewer(User user) {
        return Viewer.builder()
            .user(user)
            .build();
    }

    public ViewerResponse toViewerResponse(Viewer viewer) {
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

