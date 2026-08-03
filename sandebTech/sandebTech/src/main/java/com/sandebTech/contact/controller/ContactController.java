package com.sandebTech.contact.controller;

import com.sandebTech.contact.dto.ContactRequest;
import com.sandebTech.contact.dto.ContactResponse;
import com.sandebTech.contact.entity.ContactStatus;
import com.sandebTech.contact.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<ContactResponse> submitInquiry(@Valid @RequestBody ContactRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED).body(contactService.submitInquiry(request));

    }

    @GetMapping
    public ResponseEntity<Page<ContactResponse>> getAll(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size,

            @RequestParam(defaultValue = "createdAt") String sortBy,

            @RequestParam(defaultValue = "desc") String direction

    ) {

        return ResponseEntity.ok(

                contactService.getAll(

                        page,

                        size,

                        sortBy,

                        direction

                )

        );

    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactResponse> getById(@PathVariable Long id) {

        return ResponseEntity.ok(contactService.getById(id));

    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ContactResponse>> getByStatus(@PathVariable ContactStatus status) {

        return ResponseEntity.ok(contactService.getByStatus(status));

    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ContactResponse> updateStatus(

            @PathVariable Long id,

            @RequestParam ContactStatus status

    ) {

        return ResponseEntity.ok(contactService.updateStatus(id, status));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        contactService.delete(id);

        return ResponseEntity.noContent().build();

    }

}
