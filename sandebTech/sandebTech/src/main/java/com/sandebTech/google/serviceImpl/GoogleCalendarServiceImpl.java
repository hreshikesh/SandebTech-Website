package com.sandebTech.google.serviceImpl;


import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.*;

import com.sandebTech.config.GoogleCalendarProvider;
import com.sandebTech.google.service.GoogleCalendarService;
import com.sandebTech.meeting.entity.Meeting;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


import java.time.ZoneId;
import java.util.List;
import java.util.UUID;



@Service
@RequiredArgsConstructor
public class GoogleCalendarServiceImpl
        implements GoogleCalendarService {



    private final GoogleCalendarProvider calendarProvider;



    @Value("${google.calendar.id}")
    private String calendarId;





    @Override
    public Meeting createMeeting(
            Meeting meeting
    )
            throws Exception {



        Calendar calendar =
                calendarProvider.getCalendar();




        Event event =
                new Event();



        event.setSummary(
                "SandebTech Consultation"
        );



        event.setDescription(

                "Purpose : "
                        + meeting.getPurpose()

                        + "\n\nNotes : "

                        + (
                        meeting.getNotes()==null
                                ?
                                ""
                                :
                                meeting.getNotes()
                )

        );




        DateTime start =

                new DateTime(

                        meeting.getMeetingDate()

                                .atTime(
                                        meeting.getStartTime()
                                )

                                .atZone(
                                        ZoneId.of(
                                                "Asia/Kolkata"
                                        )
                                )

                                .toInstant()

                                .toEpochMilli()

                );




        DateTime end =

                new DateTime(

                        meeting.getMeetingDate()

                                .atTime(
                                        meeting.getEndTime()
                                )

                                .atZone(
                                        ZoneId.of(
                                                "Asia/Kolkata"
                                        )
                                )

                                .toInstant()

                                .toEpochMilli()

                );





        event.setStart(

                new EventDateTime()

                        .setDateTime(start)

                        .setTimeZone(
                                "Asia/Kolkata"
                        )

        );




        event.setEnd(

                new EventDateTime()

                        .setDateTime(end)

                        .setTimeZone(
                                "Asia/Kolkata"
                        )

        );





        event.setReminders(

                new Event.Reminders()

                        .setUseDefault(false)

                        .setOverrides(

                                List.of(

                                        new EventReminder()

                                                .setMethod(
                                                        "popup"
                                                )

                                                .setMinutes(
                                                        10
                                                )

                                )

                        )

        );





        ConferenceSolutionKey key =

                new ConferenceSolutionKey()

                        .setType(
                                "hangoutsMeet"
                        );




        CreateConferenceRequest request =

                new CreateConferenceRequest()

                        .setRequestId(
                                UUID.randomUUID()
                                        .toString()
                        )

                        .setConferenceSolutionKey(
                                key
                        );





        event.setConferenceData(

                new ConferenceData()

                        .setCreateRequest(
                                request
                        )

        );






        Event created =

                calendar.events()

                        .insert(
                                calendarId,
                                event
                        )

                        .setConferenceDataVersion(
                                1
                        )

                        .execute();





        meeting.setGoogleEventId(
                created.getId()
        );





        if(created.getConferenceData()!=null
                &&
                created.getConferenceData()
                        .getEntryPoints()!=null){



            created.getConferenceData()

                    .getEntryPoints()

                    .stream()

                    .filter(
                            e ->
                                    "video"
                                            .equals(
                                                    e.getEntryPointType()
                                            )
                    )

                    .findFirst()

                    .ifPresent(
                            e ->
                                    meeting.setGoogleMeetLink(
                                            e.getUri()
                                    )
                    );


        }





        return meeting;

    }





    @Override
    public void deleteMeeting(
            Meeting meeting
    )
            throws Exception {



        if(meeting.getGoogleEventId()==null)
            return;




        Calendar calendar =
                calendarProvider.getCalendar();




        calendar.events()

                .delete(
                        calendarId,
                        meeting.getGoogleEventId()
                )

                .execute();


    }


}
