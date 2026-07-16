package com.sandebTech.admin.dto;


import com.sandebTech.user.entity.UserRole;
import jakarta.validation.constraints.NotNull;
import lombok.*;



@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateUserRoleRequest {

    @NotNull
    private UserRole role;

}