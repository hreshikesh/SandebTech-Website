package com.sandebTech.meeting.controller;

import com.sandebTech.meeting.dto.AvailableSlotResponse;
import com.sandebTech.meeting.dto.MeetingRequest;
import com.sandebTech.meeting.dto.MeetingResponse;
import com.sandebTech.meeting.service.MeetingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/meeting")
@RequiredArgsConstructor
public class MeetingController {

    private final MeetingService meetingService;

    @PostMapping
    public ResponseEntity<MeetingResponse> bookMeeting(

            @Valid
            @RequestBody
            MeetingRequest request

    ) {

        return ResponseEntity.status(HttpStatus.CREATED)

                .body(

                        meetingService.bookMeeting(request)

                );

    }


    @GetMapping("/available-slots")
    public List<AvailableSlotResponse> getAvailableSlots(
            @RequestParam LocalDate date
    ) {

        return meetingService.getAvailableSlots(date);

    }
}
