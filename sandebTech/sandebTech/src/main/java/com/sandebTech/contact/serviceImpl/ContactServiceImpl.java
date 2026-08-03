package com.sandebTech.contact.serviceImpl;

import com.sandebTech.contact.dto.ContactRequest;
import com.sandebTech.contact.dto.ContactResponse;
import com.sandebTech.contact.entity.ContactMessage;
import com.sandebTech.contact.entity.ContactStatus;
import com.sandebTech.contact.repository.ContactRepository;
import com.sandebTech.contact.service.ContactService;
import com.sandebTech.email.service.EmailService;
import com.sandebTech.exception.ResourceNotFoundException;
import com.sandebTech.user.entity.User;
import com.sandebTech.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;

    private final EmailService emailService;

    private final UserService userService;


    @Override
    public ContactResponse submitInquiry(ContactRequest request) {
        User user = userService.getCurrentUser();

        ContactMessage contact = ContactMessage.builder()
                .user(user)

                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())

                .company(request.getCompany())

                .subject(request.getSubject())

                .message(request.getMessage())

                .status(ContactStatus.NEW)

                .build();

        ContactMessage saved = contactRepository.save(contact);

        emailService.sendContactInquiry(saved);

        return map(saved);

    }

    @Override

    public Page<ContactResponse> getAll(
            int page,
            int size,
            String sortBy,
            String direction
    ) {

        Sort sort = direction.equalsIgnoreCase("desc")

                ? Sort.by(sortBy).descending()

                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(
                page,
                size,
                sort
        );

        return contactRepository.findAll(pageable)

                .map(this::map);

    }

    @Override
    public ContactResponse getById(Long id) {

        ContactMessage contact = contactRepository

                .findById(id)

                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Contact inquiry not found."
                        ));

        return map(contact);

    }

    @Override
    public List<ContactResponse> getByStatus(ContactStatus status) {

        return contactRepository.findByStatus(status)

                .stream()

                .map(this::map)

                .toList();

    }

    @Override
    public ContactResponse updateStatus(Long id, ContactStatus status) {

        ContactMessage contact = contactRepository

                .findById(id)

                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Contact inquiry not found."
                        ));

        contact.setStatus(status);

        ContactMessage updated = contactRepository.save(contact);

        return map(updated);

    }

    @Override
    public void delete(Long id) {
        ContactMessage contact = contactRepository

                .findById(id)

                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Contact inquiry not found."
                        ));

        contactRepository.delete(contact);
    }

    private ContactResponse map(ContactMessage contact) {

        return ContactResponse.builder()

                .id(contact.getId())

                .name(contact.getName())
                .email(contact.getEmail())
                .phone(contact.getPhone())
                .company(contact.getCompany())

                .subject(contact.getSubject())

                .message(contact.getMessage())

                .status(contact.getStatus())

                .createdAt(contact.getCreatedAt())

                .build();

    }
}
