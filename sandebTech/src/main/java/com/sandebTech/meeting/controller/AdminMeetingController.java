package com.sandebTech.meeting.controller;

import com.sandebTech.meeting.dto.MeetingResponse;
import com.sandebTech.meeting.dto.UpdateMeetingStatusRequest;
import com.sandebTech.meeting.entity.MeetingStatus;
import com.sandebTech.meeting.service.MeetingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/meeting")
@RequiredArgsConstructor
public class AdminMeetingController {

    private final MeetingService meetingService;

    @GetMapping
    public ResponseEntity<Page<MeetingResponse>> getAll(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size,

            @RequestParam(defaultValue = "createdAt")
            String sortBy,

            @RequestParam(defaultValue = "desc")
            String direction

    ) {

        return ResponseEntity.ok(

                meetingService.getAll(

                        page,

                        size,

                        sortBy,

                        direction

                )

        );

    }

    @GetMapping("/{id}")
    public ResponseEntity<MeetingResponse> getById(

            @PathVariable
            Long id

    ) {

        return ResponseEntity.ok(

                meetingService.getById(id)

        );

    }

    @GetMapping("/status/{status}")
    public ResponseEntity<Page<MeetingResponse>> getByStatus(

            @PathVariable
            MeetingStatus status,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size

    ) {

        return ResponseEntity.ok(

                meetingService.getByStatus(

                        status,

                        page,

                        size

                )

        );

    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<MeetingResponse> updateStatus(

            @PathVariable
            Long id,

            @Valid
            @RequestBody
            UpdateMeetingStatusRequest request

    ) {

        return ResponseEntity.ok(

                meetingService.updateStatus(

                        id,

                        request

                )

        );

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(

            @PathVariable
            Long id

    ) {

        meetingService.delete(id);

        return ResponseEntity.noContent().build();

    }

}
