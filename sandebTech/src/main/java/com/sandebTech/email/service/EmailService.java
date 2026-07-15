package com.sandebTech.email.service;


import com.sandebTech.contact.entity.ContactMessage;
import com.sandebTech.meeting.entity.Meeting;

public interface EmailService {

    void sendOtp(String to, String otp);

    void sendContactInquiry(ContactMessage contact);
    void sendMeetingRequest(Meeting meeting);


}
