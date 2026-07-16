package com.sandebTech.meeting.serviceImpl;

import com.sandebTech.config.MeetingConstants;
import com.sandebTech.email.service.EmailService;
import com.sandebTech.exception.InvalidRequestException;
import com.sandebTech.exception.ResourceNotFoundException;
import com.sandebTech.google.service.GoogleCalendarService;
import com.sandebTech.meeting.dto.AvailableSlotResponse;
import com.sandebTech.meeting.dto.MeetingRequest;
import com.sandebTech.meeting.dto.MeetingResponse;
import com.sandebTech.meeting.dto.UpdateMeetingStatusRequest;
import com.sandebTech.meeting.entity.Meeting;
import com.sandebTech.meeting.entity.MeetingStatus;
import com.sandebTech.meeting.repository.MeetingRepository;
import com.sandebTech.meeting.service.MeetingService;
import com.sandebTech.user.entity.User;
import com.sandebTech.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MeetingServiceImpl implements MeetingService {

    private final MeetingRepository meetingRepository;
    private final UserService userService;
    private final EmailService emailService;
    private final GoogleCalendarService googleCalendarService;

    @Override
    public MeetingResponse bookMeeting(MeetingRequest request) {
        validateMeetingRequest(request);

        User currentUser = userService.getCurrentUser();

        Meeting meeting = Meeting.builder()
                .user(currentUser)
                .meetingDate(request.getMeetingDate())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .purpose(request.getPurpose())
                .notes(request.getNotes())
                .meetingMode(request.getMeetingMode())
                .status(MeetingStatus.PENDING)
                .build();

        Meeting saved = meetingRepository.save(meeting);

        emailService.sendMeetingRequest(saved);

        return map(saved);
    }

    @Override
    public MeetingResponse getById(Long id) {
        Meeting meeting = meetingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Meeting not found."));
        return map(meeting);
    }

    @Override
    public Page<MeetingResponse> getAll(int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return meetingRepository.findAll(pageable).map(this::map);
    }

    @Override
    public Page<MeetingResponse> getByStatus(MeetingStatus status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return meetingRepository.findByStatus(status, pageable).map(this::map);
    }

    @Override
    public MeetingResponse updateStatus(Long id, UpdateMeetingStatusRequest request) {

        Meeting meeting = meetingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Meeting not found."));

        validateStatusTransition(meeting.getStatus(), request.getStatus());

        try {

            if (request.getStatus() == MeetingStatus.CONFIRMED) {

                meeting.setStatus(MeetingStatus.CONFIRMED);
                meeting.setAdminRemarks(request.getAdminRemarks());

                meeting = googleCalendarService.createMeeting(meeting);

                meetingRepository.save(meeting);

                emailService.sendMeetingConfirmation(meeting);

            }

            else if (request.getStatus() == MeetingStatus.CANCELLED) {

                meeting.setStatus(MeetingStatus.CANCELLED);
                meeting.setAdminRemarks(request.getAdminRemarks());

                googleCalendarService.deleteMeeting(meeting);

                meeting.setGoogleEventId(null);
                meeting.setGoogleMeetLink(null);

                meetingRepository.save(meeting);

                emailService.sendMeetingCancellation(meeting);

            }

            else if (request.getStatus() == MeetingStatus.REJECTED) {

                meeting.setStatus(MeetingStatus.REJECTED);
                meeting.setAdminRemarks(request.getAdminRemarks());

                meetingRepository.save(meeting);

                emailService.sendMeetingRejected(meeting);

            }

            // FIX: this branch was missing, so CONFIRMED -> COMPLETED
            // passed validation but silently did nothing before.
            else if (request.getStatus() == MeetingStatus.COMPLETED) {

                meeting.setStatus(MeetingStatus.COMPLETED);
                meeting.setAdminRemarks(request.getAdminRemarks());

                meetingRepository.save(meeting);


                 emailService.sendMeetingCompleted(meeting);
            }

            Meeting updated = meetingRepository.save(meeting);

            return map(updated);

        }
        catch (Exception e) {
            throw new RuntimeException("Google Calendar integration failed.", e);
        }
    }

    @Override
    public void delete(Long id) {
        Meeting meeting = meetingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Meeting not found."));
        meetingRepository.delete(meeting);
    }

    @Override
    public List<AvailableSlotResponse> getAvailableSlots(LocalDate date) {

        List<Meeting> meetings = meetingRepository.findByMeetingDateAndStatusNot(date, MeetingStatus.CANCELLED);

        List<AvailableSlotResponse> slots = new ArrayList<>();

        LocalTime current = MeetingConstants.BUSINESS_START;

        while (current.isBefore(MeetingConstants.BUSINESS_END)) {

            LocalTime end = current.plusMinutes(MeetingConstants.SLOT_DURATION_MINUTES);

            boolean available = true;

            for (Meeting meeting : meetings) {
                boolean overlap = current.isBefore(meeting.getEndTime()) && end.isAfter(meeting.getStartTime());
                if (overlap) {
                    available = false;
                    break;
                }
            }

            slots.add(
                    AvailableSlotResponse.builder()
                            .startTime(current)
                            .endTime(end)
                            .available(available)
                            .build()
            );

            current = end;
        }

        return slots;
    }

    private MeetingResponse map(Meeting meeting) {
        return MeetingResponse.builder()
                .id(meeting.getId())
                .name(meeting.getUser().getName())
                .email(meeting.getUser().getEmail())
                .phone(meeting.getUser().getPhone())
                .company(meeting.getUser().getCompany())
                .meetingDate(meeting.getMeetingDate())
                .startTime(meeting.getStartTime())
                .endTime(meeting.getEndTime())
                .purpose(meeting.getPurpose())
                .notes(meeting.getNotes())
                .meetingMode(meeting.getMeetingMode())
                .status(meeting.getStatus())
                .googleMeetLink(meeting.getGoogleMeetLink())
                .adminRemarks(meeting.getAdminRemarks())
                .createdAt(meeting.getCreatedAt())
                .build();
    }

    private void validateMeetingRequest(MeetingRequest request) {

        if (!request.getMeetingDate().isAfter(LocalDate.now())) {
            throw new InvalidRequestException("Meeting must be booked at least one day in advance.");
        }
        if (!request.getEndTime().isAfter(request.getStartTime())) {
            throw new InvalidRequestException("End time must be after start time.");
        }
        if (request.getStartTime().isBefore(MeetingConstants.BUSINESS_START) || request.getEndTime().isAfter(MeetingConstants.BUSINESS_END)) {
            throw new InvalidRequestException("Meetings are available only between 9:00 AM and 6:00 PM.");
        }
        if (MeetingConstants.WEEKENDS.contains(request.getMeetingDate().getDayOfWeek())) {
            throw new InvalidRequestException("Meetings cannot be booked on weekends.");
        }

        long duration = Duration.between(request.getStartTime(), request.getEndTime()).toMinutes();
        if (duration < MeetingConstants.MIN_DURATION_MINUTES || duration > MeetingConstants.MAX_DURATION_MINUTES) {
            throw new InvalidRequestException("Meeting duration must be between 30 and 60 minutes.");
        }

        boolean overlap = meetingRepository
                .existsByMeetingDateAndStatusNotAndStartTimeLessThanAndEndTimeGreaterThan(
                        request.getMeetingDate(),
                        MeetingStatus.CANCELLED,
                        request.getEndTime(),
                        request.getStartTime()
                );
        if (overlap) {
            throw new InvalidRequestException("Selected time slot is already booked.");
        }
    }

    private void validateStatusTransition(MeetingStatus current, MeetingStatus next) {
        switch (current) {

            case PENDING -> {
                if (next != MeetingStatus.CONFIRMED && next != MeetingStatus.REJECTED && next != MeetingStatus.CANCELLED) {
                    throw new InvalidRequestException("Invalid meeting status transition.");
                }
            }

            case CONFIRMED -> {
                if (next != MeetingStatus.COMPLETED && next != MeetingStatus.CANCELLED) {
                    throw new InvalidRequestException("Invalid meeting status transition.");
                }
            }

            default -> throw new InvalidRequestException("Meeting status cannot be changed.");
        }
    }
}