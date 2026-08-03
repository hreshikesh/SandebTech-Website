package com.sandebTech.admin.service;

import com.sandebTech.admin.dto.UpdateUserRoleRequest;
import com.sandebTech.admin.dto.UserSummaryResponse;
import org.springframework.data.domain.Page;

public interface AdminUserService {
     Page<UserSummaryResponse> getAllUsers(
            int page,
            int size,
            String sortBy,
            String direction
    );
    UserSummaryResponse getUser(Long id);

     UserSummaryResponse updateRole(
            Long id,
            UpdateUserRoleRequest request
    );

    public void deleteUser(Long id);


}
