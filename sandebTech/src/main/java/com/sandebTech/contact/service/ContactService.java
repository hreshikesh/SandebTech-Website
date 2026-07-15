package com.sandebTech.contact.service;


import com.sandebTech.contact.dto.ContactRequest;
import com.sandebTech.contact.dto.ContactResponse;
import com.sandebTech.contact.entity.ContactStatus;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ContactService {

    ContactResponse submitInquiry(ContactRequest request);

    Page<ContactResponse> getAll(
            int page,
            int size,
            String sortBy,
            String direction
    );

    ContactResponse getById(Long id);

    List<ContactResponse> getByStatus(ContactStatus status);

    ContactResponse updateStatus(Long id, ContactStatus status);

    void delete(Long id);

}
