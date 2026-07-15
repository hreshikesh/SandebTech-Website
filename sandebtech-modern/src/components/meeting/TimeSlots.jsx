import "./TimeSlots.css";

import { useEffect, useState } from "react";
import { getAvailableSlots } from "../../service/meetingApi";

function formatTime(time) {
    return new Date(`1970-01-01T${time}`)
        .toLocaleTimeString("en-IN", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
}

function TimeSlots({

    selectedDate,

    selectedSlot,

    setSelectedSlot,

}) {

    const [slots, setSlots] = useState([]);

    useEffect(() => {

        async function loadSlots() {

            try {

                const data = await getAvailableSlots(selectedDate);

                setSlots(data);

            } catch (error) {

                console.error(error);

            }

        }

        if (selectedDate) {

            loadSlots();

        }

    }, [selectedDate]);

    return (

        <section className="time-slots">

            <p className="selected-date">

                {selectedDate.toLocaleDateString("en-IN", {

                    weekday: "long",

                    day: "numeric",

                    month: "long",

                    year: "numeric",

                })}

            </p>

            <div className="meeting-section-title">

                <h3>Available Time Slots</h3>

                <p>Select a convenient time for your meeting.</p>

            </div>

            <div className="slots-grid">

                {slots.map((slot) => (

                    <button

                        key={slot.startTime}

                        disabled={!slot.available}

                        className={`slot-btn

                            ${selectedSlot?.startTime === slot.startTime

                                ? "active-slot"

                                : ""}

                            ${!slot.available

                                ? "disabled-slot"

                                : ""}

                        `}

                        onClick={() =>

                            slot.available && setSelectedSlot(slot)

                        }

                    >

                        {formatTime(slot.startTime)}
                        {" - "}
                        {formatTime(slot.endTime)}

                    </button>

                ))}

            </div>

        </section>

    );

}

export default TimeSlots;