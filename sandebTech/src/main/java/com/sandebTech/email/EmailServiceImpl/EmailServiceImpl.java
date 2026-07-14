package com.sandebTech.email.EmailServiceImpl;

import com.sandebTech.email.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine; // Thymeleaf template processing engine

    @Override
    @Async
    public void sendOtp(String to, String otp) {
        try {
            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(
                    message,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name()
            );

            Context context = new Context();
            context.setVariable("otp", otp);

            String htmlContent = templateEngine.process("contact-email", context);

            helper.setTo(to);
            helper.setSubject("SandebTech Login Verification");
            helper.setText(htmlContent, true);


            helper.addInline("logo", new ClassPathResource("static/images/logo.png"));

            mailSender.send(message);

        } catch (MessagingException e) {

            throw new RuntimeException("Failed to send HTML OTP email", e);
        }
    }
}