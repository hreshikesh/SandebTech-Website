package com.sandebTech.admin.dto;

import com.sandebTech.user.entity.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSummaryResponse {

    private Long id;

    private String name;

    private String email;

    private String phone;

    private String company;

    private UserRole userRole;

    private LocalDateTime createdAt;

}