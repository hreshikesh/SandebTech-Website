import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const IDLE_TIME = 30 * 60 * 1000; // 30 mins

export default function SessionTimeout() {
  const navigate = useNavigate();

  useEffect(() => {
    let timeout;

    const logout = () => {
      localStorage.removeItem("token");

      toast.error("Session expired. Please login again.");

      navigate("/");
    };

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(logout, IDLE_TIME);
    };

    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    events.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer();

    return () => {
      clearTimeout(timeout);

      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [navigate]);

  return null;
}