package com.sandebTech.google.service;

import com.sandebTech.meeting.entity.Meeting;



public interface GoogleCalendarService {

    Meeting createMeeting(Meeting meeting) throws Exception;

    void deleteMeeting(Meeting meeting) throws Exception;

}