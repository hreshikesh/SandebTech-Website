package com.sandebTech.meeting.repository;


import com.sandebTech.meeting.entity.Meeting;
import com.sandebTech.meeting.entity.MeetingStatus;
import com.sandebTech.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {

    List<Meeting> findByUser(User user);

    List<Meeting> findByStatus(MeetingStatus status);

    boolean existsByMeetingDateAndStartTime(
            LocalDate meetingDate,
            LocalTime startTime
    );

    Page<Meeting> findByStatus(
            MeetingStatus status,
            Pageable pageable
    );

    boolean existsByMeetingDateAndStatusNotAndStartTimeLessThanAndEndTimeGreaterThan(
            LocalDate meetingDate,
            MeetingStatus status,
            LocalTime endTime,
            LocalTime startTime
    );

    List<Meeting> findByMeetingDateAndStatusNot(
            LocalDate meetingDate,
            MeetingStatus status
    );

    long count();

    long countByStatus(MeetingStatus status);

}
