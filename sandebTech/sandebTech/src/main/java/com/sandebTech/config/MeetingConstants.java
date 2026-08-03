package com.sandebTech.config;


import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.Set;

public final class MeetingConstants {

    private MeetingConstants() {}

    public static final int SLOT_DURATION_MINUTES = 30;

    public static final LocalTime BUSINESS_START =
            LocalTime.of(9, 0);

    public static final LocalTime BUSINESS_END =
            LocalTime.of(18, 0);

    public static final int MIN_DURATION_MINUTES = 30;

    public static final int MAX_DURATION_MINUTES = 60;

    public static final Set<DayOfWeek> WEEKENDS =
            Set.of(
                    DayOfWeek.SATURDAY,
                    DayOfWeek.SUNDAY
            );

}