package com.sandebTech.meeting.dto;


import com.sandebTech.meeting.entity.MeetingStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateMeetingStatusRequest {

    @NotNull
    private MeetingStatus status;

    private String adminRemarks;

}