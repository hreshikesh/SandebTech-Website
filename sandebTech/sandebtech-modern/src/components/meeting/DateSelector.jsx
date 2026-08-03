import "./DateSelector.css";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

function DateSelector({
    selectedDate,
    setSelectedDate,
}) {

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    return (
        <>
            <div className="meeting-section-title">
                <h3>Select Date</h3>
                <p>Choose your preferred meeting date.</p>
            </div>

            <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                    if (date) {
                        setSelectedDate(date);
                    }
                    // if date is undefined (user clicked the already-selected day),
                    // keep the previous selection instead of clearing it
                }}
                disabled={[
                    { before: tomorrow },
                    { dayOfWeek: [0, 6] },
                ]}
                showOutsideDays
            />
        </>
    );
}

export default DateSelector;