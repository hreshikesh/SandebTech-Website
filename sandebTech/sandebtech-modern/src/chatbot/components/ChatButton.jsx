import { FaRobot } from "react-icons/fa";
import { X } from "lucide-react";

export default function ChatButton({ open, onClick }) {
  return (
    <button
      className={`chat-button ${open ? "open" : ""}`}
      onClick={onClick}
      type="button"
      aria-label={open ? "Close Chat" : "Ask Sandeb AI"}
      aria-expanded={open}
    >
    <FaRobot size={20} />
    
    </button>
  );
}