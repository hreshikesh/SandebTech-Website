package com.sandebTech.auth.serviceImpl;

import com.sandebTech.auth.dto.AuthResponse;
import com.sandebTech.auth.dto.LoginRequest;
import com.sandebTech.auth.dto.RegisterRequest;
import com.sandebTech.auth.dto.VerifyOtpRequest;
import com.sandebTech.auth.otp.OtpService;
import com.sandebTech.auth.service.AuthService;
import com.sandebTech.email.service.EmailService;
import com.sandebTech.exception.DuplicateResourceException;
import com.sandebTech.exception.InvalidOtpException;
import com.sandebTech.exception.ResourceNotFoundException;
import com.sandebTech.security.JwtService;
import com.sandebTech.user.dto.UserResponse;
import com.sandebTech.user.entity.User;
import com.sandebTech.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    private final OtpService otpService;

    private final EmailService emailService;

    private final JwtService jwtService;

    @Override
    public void login(LoginRequest request) {

        String otp = otpService.generateOtp(request.getEmail());

        emailService.sendOtp(request.getEmail(), otp);

        log.info("OTP sent successfully to {}", request.getEmail());

    }

    @Override
    public AuthResponse verifyOtp(VerifyOtpRequest request) {

        boolean verified = otpService.verifyOtp(
                request.getEmail(),
                request.getOtp()
        );

        if (!verified) {

            throw new InvalidOtpException("Invalid or Expired OTP");

        }

        return userRepository.findByEmail(request.getEmail())

                .map(user -> AuthResponse.builder()

                        .success(true)

                        .newUser(false)

                        .token(jwtService.generateToken(user))

                        .userResponse(mapUser(user))

                        .message("Login Successful")

                        .build())

                .orElse(

                        AuthResponse.builder()

                                .success(true)

                                .newUser(true)

                                .message("Complete Registration")

                                .build()

                );

    }

    @Override
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {

            throw new DuplicateResourceException("Email Already Exists");

        }

        if (userRepository.existsByPhone(request.getPhone())) {

            throw new DuplicateResourceException("Phone Number Already Exists");

        }

        User user = User.builder()

                .name(request.getName())

                .email(request.getEmail())

                .phone(request.getPhone())

                .company(request.getCompany())

                .verified(true)

                .build();

        User savedUser = userRepository.save(user);

        return AuthResponse.builder()

                .success(true)

                .newUser(false)

                .token(jwtService.generateToken(savedUser))

                .userResponse(mapUser(savedUser))

                .message("Registration Successful")

                .build();

    }

    @Override
    public UserResponse getCurrentUser() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)

                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        return mapUser(user);
    }

    private UserResponse mapUser(User user) {

        return UserResponse.builder()

                .id(user.getId())

                .name(user.getName())

                .email(user.getEmail())

                .phone(user.getPhone())

                .company(user.getCompany())

                .role(user.getRole().name())

                .build();

    }

}