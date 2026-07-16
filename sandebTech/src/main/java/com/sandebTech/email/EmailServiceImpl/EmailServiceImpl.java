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

            // FIX: was using "contact-email" template - use a dedicated OTP template
            String htmlContent = templateEngine.process("otp-email", context);

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
    @Async
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
    @Async
    public void sendMeetingRequest(Meeting meeting) {
        try {
            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(contactRecipient);
            helper.setSubject("📅 New Meeting Request");

            helper.setText(
                    buildMeetingRequestHtml(meeting, "NEW MEETING REQUEST", "#f59e0b"),
                    true
            );

            helper.addInline("logo", new ClassPathResource("static/images/logo.png"));

            mailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException("Unable to send meeting request email.", e);
        }
    }

    @Override
    @Async
    public void sendMeetingConfirmation(Meeting meeting) {
        try {
            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(meeting.getUser().getEmail());
            helper.setSubject("✅ Meeting Confirmed");

            helper.setText(
                    buildMeetingRequestHtml(meeting, "MEETING CONFIRMED", "#16a34a"),
                    true
            );

            helper.addInline("logo", new ClassPathResource("static/images/logo.png"));

            mailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException("Unable to send confirmation email.", e);
        }
    }

    @Override
    @Async
    public void sendMeetingRejected(Meeting meeting) {
        try {
            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(meeting.getUser().getEmail());
            helper.setSubject("❌ Meeting Rejected");

            helper.setText(
                    buildMeetingRequestHtml(meeting, "MEETING REJECTED", "#dc2626"),
                    true
            );

            helper.addInline("logo", new ClassPathResource("static/images/logo.png"));

            mailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException("Unable to send rejection email.", e);
        }
    }

    @Override
    @Async
    public void sendMeetingCancellation(Meeting meeting) {
        try {
            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(meeting.getUser().getEmail());
            helper.setSubject("🚫 Meeting Cancelled");

            helper.setText(
                    buildMeetingRequestHtml(meeting, "MEETING CANCELLED", "#dc2626"),
                    true
            );

            helper.addInline("logo", new ClassPathResource("static/images/logo.png"));

            mailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException("Unable to send cancellation email.", e);
        }
    }

    @Override
    @Async
    public void sendMeetingCompleted(Meeting meeting) {
        try {
            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(meeting.getUser().getEmail());
            helper.setSubject("✅ Meeting Completed");

            helper.setText(
                    buildMeetingRequestHtml(meeting, "MEETING COMPLETED", "#16a34a"),
                    true
            );

            helper.addInline("logo", new ClassPathResource("static/images/logo.png"));

            mailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException("Unable to send completion email.", e);
        }
    }

    private String buildMeetingRequestHtml(Meeting meeting, String title, String color) {

        String meetLink = meeting.getGoogleMeetLink() == null
                ? "Will be shared shortly."
                : "<a href='" + meeting.getGoogleMeetLink() + "'>" + meeting.getGoogleMeetLink() + "</a>";

        return """
                <html>
                <body style='font-family:Arial;padding:25px;background:#f4f4f4;'>
                <div style='max-width:650px;margin:auto;background:white;padding:30px;border-radius:12px;'>
                    <img src='cid:logo' width='170'/>
                    <h2 style='color:%s;'>%s</h2>
                    <hr>
                    <p><b>Name :</b> %s</p>
                    <p><b>Email :</b> %s</p>
                    <p><b>Company :</b> %s</p>
                    <p><b>Date :</b> %s</p>
                    <p><b>Time :</b> %s - %s</p>
                    <p><b>Purpose :</b> %s</p>
                    <p><b>Meeting Mode :</b> %s</p>
                    <p><b>Google Meet :</b><br>%s</p>
                    <br>
                    <p>Regards,</p>
                    <b>SandebTech</b>
                </div>
                </body>
                </html>
                """.formatted(
                color,
                title,
                meeting.getUser().getName(),
                meeting.getUser().getEmail(),
                meeting.getUser().getCompany(),
                meeting.getMeetingDate(),
                meeting.getStartTime(),
                meeting.getEndTime(),
                meeting.getPurpose(),
                meeting.getMeetingMode(),
                meetLink
        );
    }
}