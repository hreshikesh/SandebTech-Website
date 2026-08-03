package com.sandebTech.admin.serviceImpl;

import com.sandebTech.admin.dto.DashboardResponse;
import com.sandebTech.admin.service.DashboardService;
import com.sandebTech.contact.entity.ContactStatus;
import com.sandebTech.contact.repository.ContactRepository;
import com.sandebTech.meeting.entity.MeetingStatus;
import com.sandebTech.meeting.repository.MeetingRepository;
import com.sandebTech.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepository;

    private final MeetingRepository meetingRepository;

    private final ContactRepository contactRepository;

    @Override
    public DashboardResponse getDashboard() {

        return DashboardResponse.builder()

                .totalUsers(
                        userRepository.count()
                )

                .totalMeetings(
                        meetingRepository.count()
                )

                .pendingMeetings(
                        meetingRepository.countByStatus(
                                MeetingStatus.PENDING
                        )
                )

                .totalContacts(
                        contactRepository.count()
                )

                .newContacts(
                        contactRepository.countByStatus(
                                ContactStatus.NEW
                        )
                )

                .build();

    }

}