package com.sandebTech.auth.controller;


import com.sandebTech.auth.dto.AuthResponse;
import com.sandebTech.auth.dto.LoginRequest;
import com.sandebTech.auth.dto.RegisterRequest;
import com.sandebTech.auth.dto.VerifyOtpRequest;
import com.sandebTech.auth.service.AuthService;
import com.sandebTech.user.dto.UserResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public void login(

            @Valid

            @RequestBody

            LoginRequest request

    ) {

        authService.login(request);

    }

    @PostMapping("/verify")

    public AuthResponse verify(
            @Valid
            @RequestBody VerifyOtpRequest request
    ) {

        return authService.verifyOtp(request);

    }

    @PostMapping("/register")

    public AuthResponse register(
            @Valid
            @RequestBody RegisterRequest request
    ) {

        return authService.register(request);

    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> currentUser() {

        return ResponseEntity.ok(
                authService.getCurrentUser()
        );

    }
}
