import "./FloatingMeetingButton.css";
import { CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth"; // Standardized to look for your useAuth hook

function FloatingMeetingButton() {
  const navigate = useNavigate();
  const { requireAuth } = useAuth();

  const handleMeetingClick = () => {
    requireAuth(() => {
      navigate("/meeting");
    });
  };

  return (
    <button
      className="meeting-fab"
      onClick={handleMeetingClick}
      type="button"
      aria-label="Schedule a Meeting"
    >
      <CalendarDays size={22} />
    </button>
  );
}

export default FloatingMeetingButton;