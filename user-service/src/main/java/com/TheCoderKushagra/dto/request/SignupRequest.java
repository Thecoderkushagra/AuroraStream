package com.TheCoderKushagra.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SignupRequest(
        @NotBlank(message = "Username cannot be blank")
        @Size(min = 5, message = "Username must be at least 5 characters long")
        String username,

        @NotBlank(message = "Password cannot be blank")
        @Size(min = 8, message = "Password must be at least 8 characters long")
        String password,

        @NotBlank(message = "Email cannot be blank")
        @Email()
        String email
) {}
