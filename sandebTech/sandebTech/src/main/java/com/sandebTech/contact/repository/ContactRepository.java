package com.sandebTech.contact.repository;

import com.sandebTech.contact.entity.ContactMessage;
import com.sandebTech.contact.entity.ContactStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactRepository
        extends JpaRepository<ContactMessage, Long> {

    List<ContactMessage> findByStatus(ContactStatus status);

    long count();

    long countByStatus(ContactStatus status);

}