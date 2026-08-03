package com.sandebTech.admin.controller;

import com.sandebTech.admin.dto.UpdateUserRoleRequest;
import com.sandebTech.admin.dto.UserSummaryResponse;
import com.sandebTech.admin.service.AdminUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    private final AdminUserService adminUserService;

    @GetMapping
    public ResponseEntity<Page<UserSummaryResponse>> getAll(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size,

            @RequestParam(defaultValue = "createdAt") String sortBy,

            @RequestParam(defaultValue = "desc") String direction

    ) {

        return ResponseEntity.ok(

                adminUserService.getAllUsers(

                        page,

                        size,

                        sortBy,

                        direction

                )

        );

    }

    @GetMapping("/{id}")
    public ResponseEntity<UserSummaryResponse> getUser(

            @PathVariable Long id

    ) {

        return ResponseEntity.ok(

                adminUserService.getUser(id)

        );

    }

    @PatchMapping("/{id}/role")
    public ResponseEntity<UserSummaryResponse> updateRole(

            @PathVariable Long id,

            @Valid
            @RequestBody UpdateUserRoleRequest request

    ) {

        return ResponseEntity.ok(

                adminUserService.updateRole(id, request)

        );

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(

            @PathVariable Long id

    ) {

        adminUserService.deleteUser(id);

        return ResponseEntity.noContent().build();

    }

}