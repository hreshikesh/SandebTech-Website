package com.sandebTech.meeting.dto;

import com.sandebTech.meeting.entity.MeetingMode;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class MeetingRequest {

    @NotNull(message = "Meeting date is required.")
    @Future(message = "Meeting date must be in the future.")
    private LocalDate meetingDate;

    @NotNull(message = "Start time is required.")
    private LocalTime startTime;

    @NotNull(message = "End time is required.")
    private LocalTime endTime;

    @NotBlank(message = "Purpose is required.")
    @Size(min = 10, max = 500,message = "Purpose Should be 10-500 letters Only")
    private String purpose;

    @Size(max = 2000,message = "Maximum 2000 letters")
    private String notes;

    @NotNull(message = "Meeting mode is required.")
    private MeetingMode meetingMode;

}
