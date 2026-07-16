import "./Meeting.css";

import { useState } from "react";
import PageTransition from "../components/PageTransition/PageTransition";
import DateSelector from "../components/meeting/DateSelector";
import TimeSlots from "../components/meeting/TimeSlots";
import BookingForm from "../components/meeting/BookingForm";

function getInitialDate() {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0, 0);

    while (date.getDay() === 0 || date.getDay() === 6) {
        date.setDate(date.getDate() + 1);
    }

    return date;
}

function Meeting() {
    const [selectedDate, setSelectedDate] = useState(getInitialDate());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [slotsVersion, setSlotsVersion] = useState(0);

    const refreshSlots = () => setSlotsVersion((v) => v + 1);

    return (
        <>
            <PageTransition />

            <section className="meeting-page">
                <div className="container">
                    <div className="meeting-header">
                        <span>SCHEDULE A CONSULTATION</span>
                        <h1>Book a Meeting</h1>
                        <p>
                            Choose your preferred date and time to connect with our engineering specialists.
                        </p>
                    </div>

                    <div className="meeting-layout">
                        <div className="calendar-panel">
                            <DateSelector
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                            />
                        </div>

                        <div className="booking-panel">
                            <TimeSlots
                                selectedDate={selectedDate}
                                selectedSlot={selectedSlot}
                                setSelectedSlot={setSelectedSlot}
                                refreshTrigger={slotsVersion}
                            />

                            <BookingForm
                                selectedDate={selectedDate}
                                selectedSlot={selectedSlot}
                                setSelectedSlot={setSelectedSlot}
                                onBookingSuccess={refreshSlots}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Meeting;