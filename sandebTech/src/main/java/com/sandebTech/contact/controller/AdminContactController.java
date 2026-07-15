package com.sandebTech.contact.controller;

import com.sandebTech.contact.dto.ContactResponse;
import com.sandebTech.contact.dto.UpdateContactStatusRequest;
import com.sandebTech.contact.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/contact")
@RequiredArgsConstructor
public class AdminContactController {

    private final ContactService contactService;

    @GetMapping
    public ResponseEntity<Page<ContactResponse>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        return ResponseEntity.ok(
                contactService.getAll(page, size, sortBy, direction)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactResponse> getById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                contactService.getById(id)
        );
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ContactResponse> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateContactStatusRequest request
    ) {
        return ResponseEntity.ok(
                contactService.updateStatus(id, request.getStatus())
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id
    ) {
        contactService.delete(id);
        return ResponseEntity.noContent().build();
    }
}