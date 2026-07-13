import "./TimeSlots.css";

import { useState, useEffect } from "react";

const slots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
];


import { getAvailableSlots } from "../../service/meetingApi";
function TimeSlots({

    selectedDate,
    selectedSlot,
    setSelectedSlot,

}) {
    const [slots, setSlots] = useState([]);

    useEffect(() => {

        async function loadSlots() {

            const data = await getAvailableSlots(selectedDate);

            setSlots(data);

        }

        loadSlots();

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

                        key={slot.time}

                        disabled={!slot.available}

                        className={`slot-btn
                                     ${selectedSlot === slot.time
                                ? "active-slot"
                                : ""
                            }
                                ${!slot.available
                                ? "disabled-slot"
                                : ""
                            }`}

                        onClick={() =>
                            slot.available &&
                            setSelectedSlot(slot.time)
                        }

                    >

                        {slot.time}

                    </button>


                ))}

            </div>

        </section>

    );

}

export default TimeSlots;