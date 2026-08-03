package com.sandebTech.meeting.service;


import com.sandebTech.meeting.dto.AvailableSlotResponse;
import com.sandebTech.meeting.dto.MeetingRequest;
import com.sandebTech.meeting.dto.MeetingResponse;
import com.sandebTech.meeting.dto.UpdateMeetingStatusRequest;
import com.sandebTech.meeting.entity.MeetingStatus;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.util.List;

public interface MeetingService {

    MeetingResponse bookMeeting(
            MeetingRequest request
    );

    MeetingResponse getById(
            Long id
    );

    Page<MeetingResponse> getAll(
            int page,
            int size,
            String sortBy,
            String direction
    );

    Page<MeetingResponse> getByStatus(
            MeetingStatus status,
            int page,
            int size
    );

    MeetingResponse updateStatus(
            Long id,
            UpdateMeetingStatusRequest request
    );

    void delete(
            Long id
    );

    List<AvailableSlotResponse> getAvailableSlots(LocalDate date);

}