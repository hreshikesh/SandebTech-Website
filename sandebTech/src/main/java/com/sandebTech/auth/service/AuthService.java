package com.sandebTech.auth.service;


import com.sandebTech.auth.dto.AuthResponse;
import com.sandebTech.auth.dto.LoginRequest;
import com.sandebTech.auth.dto.RegisterRequest;
import com.sandebTech.auth.dto.VerifyOtpRequest;
import com.sandebTech.user.dto.UserResponse;

public interface AuthService {

    void login(LoginRequest request);

    AuthResponse verifyOtp(VerifyOtpRequest request);


    AuthResponse register(RegisterRequest request);

    UserResponse getCurrentUser();


}
