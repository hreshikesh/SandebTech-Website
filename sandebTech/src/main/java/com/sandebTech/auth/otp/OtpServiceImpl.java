package com.sandebTech.auth.otp;



import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpServiceImpl implements OtpService {

    private static final int OTP_LENGTH = 6;

    private static final int OTP_EXPIRY_MINUTES = 5;

    private final Map<String, OtpData> otpStorage =
            new ConcurrentHashMap<>();

    @Override
    public String generateOtp(String email) {

        String otp = String.format(
                "%06d",
                new Random().nextInt(1000000)
        );

        otpStorage.put(
                email,
                new OtpData(
                        otp,
                        LocalDateTime.now().plusMinutes(OTP_EXPIRY_MINUTES)
                )
        );

        return otp;
    }

    @Override
    public boolean verifyOtp(String email, String otp) {

        OtpData otpData = otpStorage.get(email);

        if (otpData == null) {
            return false;
        }

        if (LocalDateTime.now().isAfter(otpData.getExpiryTime())) {

            otpStorage.remove(email);

            return false;
        }

        if (!otpData.getOtp().equals(otp)) {
            return false;
        }

        otpStorage.remove(email);

        return true;
    }

    @Override
    public void removeOtp(String email) {

        otpStorage.remove(email);

    }

}
