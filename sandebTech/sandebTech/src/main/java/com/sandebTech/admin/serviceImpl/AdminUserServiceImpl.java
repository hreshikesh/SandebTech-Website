package com.sandebTech.admin.serviceImpl;

import com.sandebTech.admin.dto.UserSummaryResponse;
import com.sandebTech.admin.dto.UpdateUserRoleRequest;
import com.sandebTech.admin.service.AdminUserService;
import com.sandebTech.exception.ResourceNotFoundException;
import com.sandebTech.user.entity.User;
import com.sandebTech.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminUserServiceImpl implements AdminUserService {

    private final UserRepository userRepository;

    @Override
    public Page<UserSummaryResponse> getAllUsers(
            int page,
            int size,
            String sortBy,
            String direction
    ) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return userRepository.findAll(pageable)
                .map(this::map);

    }

    @Override
    public UserSummaryResponse getUser(Long id) {

        User user = userRepository.findById(id)

                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found."));

        return map(user);

    }

    @Override
    public UserSummaryResponse updateRole(
            Long id,
            UpdateUserRoleRequest request
    ) {

        User user = userRepository.findById(id)

                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found."));

        user.setRole(request.getRole());

        return map(userRepository.save(user));

    }

    @Override
    public void deleteUser(Long id) {

        User user = userRepository.findById(id)

                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found."));

        userRepository.delete(user);

    }

    private UserSummaryResponse map(User user) {

        return UserSummaryResponse.builder()

                .id(user.getId())

                .name(user.getName())

                .email(user.getEmail())

                .phone(user.getPhone())

                .company(user.getCompany())

                .userRole(user.getRole())

                .createdAt(user.getCreatedAt())

                .build();

    }

}