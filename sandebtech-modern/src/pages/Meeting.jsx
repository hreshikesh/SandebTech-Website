import "./Meeting.css";

import { useState } from "react";
import PageTransition from "../components/PageTransition/PageTransition";
import DateSelector from "../components/meeting/DateSelector";
import TimeSlots from "../components/meeting/TimeSlots";
import BookingForm from "../components/meeting/BookingForm";


function Meeting() {

    const [selectedDate, setSelectedDate] = useState(new Date());

    const [selectedSlot, setSelectedSlot] = useState("");

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
                            />

                            <BookingForm
                                selectedDate={selectedDate}
                                selectedSlot={selectedSlot}
                            />

                        </div>

                    </div>

                </div>

            </section>
        </>
    );

}

export default Meeting;