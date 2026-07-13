import "./DateSelector.css";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

function DateSelector({

    selectedDate,
    setSelectedDate,

}) {

    return (

        <>

            <div className="meeting-section-title">

                <h3>Select Date</h3>

                <p>
                    Choose your preferred meeting date.
                </p>

            </div>

            <DayPicker

                mode="single"

                selected={selectedDate}

                onSelect={setSelectedDate}

                disabled={[
                    {
                        before: new Date(),
                    },
                ]}

                showOutsideDays

            />

        </>

    );

}

export default DateSelector;