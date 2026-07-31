package com.TheCoderKushagra.dto.response;

import com.TheCoderKushagra.entity.enums.AccountStatus;
import com.TheCoderKushagra.entity.enums.Role;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record ViewerResponse(
        String username,
        String email,
        Role role,
        LocalDateTime createdAt,
        AccountStatus accountStatus,
        Long totalWatchTime,
        int videosWatched,
        int myList,
        String currentPlan,
        String planStatus,
        LocalDateTime renewalDate,
        boolean autoPlayNext,
        String defaultVidQuality,
        boolean notification,
        boolean subscriptionRenewalReminders,
        boolean recommendation
) { }
