package com.sandebTech.auth.otp;


public interface OtpService {

    String generateOtp(String email);

    boolean verifyOtp(String email, String otp);

    void removeOtp(String email);

}