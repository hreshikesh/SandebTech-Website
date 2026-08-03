package com.sandebTech.contact.dto;

import com.sandebTech.contact.entity.ContactStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ContactResponse {

    private Long id;

    private String name;

    private String email;

    private String phone;

    private String company;

    private String subject;

    private String message;

    private ContactStatus status;

    private LocalDateTime createdAt;

}
