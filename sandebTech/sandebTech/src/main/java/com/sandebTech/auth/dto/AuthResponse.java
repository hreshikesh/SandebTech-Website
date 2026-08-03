package com.sandebTech.auth.dto;

import com.sandebTech.user.dto.UserResponse;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthResponse {

    private boolean success;

    private boolean newUser;

    private String token;

    private String message;

    private UserResponse userResponse;
}