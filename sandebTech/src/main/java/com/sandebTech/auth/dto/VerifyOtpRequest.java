package com.sandebTech.auth.dto;



import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyOtpRequest {

    @Email
    @NotBlank
    private String email;

    @Pattern(regexp = "\\d{6}", message = "OTP must contain 6 digits")
    private String otp;

}