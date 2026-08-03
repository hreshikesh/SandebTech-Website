package com.sandebTech.admin.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    private long totalUsers;

    private long totalMeetings;

    private long pendingMeetings;

    private long totalContacts;

    private long newContacts;

}