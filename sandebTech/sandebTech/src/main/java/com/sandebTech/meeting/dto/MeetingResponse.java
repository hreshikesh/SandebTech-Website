package com.sandebTech.meeting.dto;

import com.sandebTech.meeting.entity.MeetingMode;
import com.sandebTech.meeting.entity.MeetingStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Builder
public class MeetingResponse {

    private Long id;

    private String name;

    private String email;

    private String phone;

    private String company;

    private LocalDate meetingDate;

    private LocalTime startTime;

    private LocalTime endTime;

    private String purpose;

    private String notes;

    private MeetingMode meetingMode;

    private MeetingStatus status;

    private String googleMeetLink;

    private String adminRemarks;

    private LocalDateTime createdAt;

}