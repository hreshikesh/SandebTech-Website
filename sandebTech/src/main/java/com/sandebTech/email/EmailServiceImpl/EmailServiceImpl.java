package com.sandebTech.email.EmailServiceImpl;

import com.sandebTech.contact.entity.ContactMessage;
import com.sandebTech.email.service.EmailService;
import com.sandebTech.meeting.entity.Meeting;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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
    private final TemplateEngine templateEngine;
    @Value("${sandebtech.mail.contact-recipient}")
    private String contactRecipient;

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

    @Override
    public void sendContactInquiry(ContactMessage contact) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();


            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo(contactRecipient);
            helper.setSubject("📩 New Contact Inquiry - SandebTech");

            Context context = new Context();
            context.setVariable("name", contact.getUser().getName());
            context.setVariable("email", contact.getUser().getEmail());
            context.setVariable("phone", contact.getUser().getPhone());
            context.setVariable("company", contact.getUser().getCompany());
            context.setVariable("subject", contact.getSubject());
            context.setVariable("message", contact.getMessage());


            String htmlContent = templateEngine.process("contact-inquiry", context);
            helper.setText(htmlContent, true);


            ClassPathResource logoResource = new ClassPathResource("static/images/logo.png");
            helper.addInline("logo", logoResource);

            mailSender.send(mimeMessage);

        } catch (Exception e) {
            throw new RuntimeException("Unable to send contact email.", e);
        }
    }

        @Override
        public void sendMeetingRequest (Meeting meeting){


        }
        private String buildMeetingRequestHtml (Meeting meeting){
            return null;
        }
}