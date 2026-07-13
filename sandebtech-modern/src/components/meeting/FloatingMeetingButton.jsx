import "./FloatingMeetingButton.css";

import { CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

function FloatingMeetingButton() {

  const navigate = useNavigate();

  return (

    <button
      className="meeting-fab"
      onClick={() => navigate("/meeting")}
    >

      <CalendarDays size={22} />


    </button>

  );

}

export default FloatingMeetingButton;