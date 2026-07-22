import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export default function SessionTimeout() {
  const navigate = useNavigate();
  const timer = useRef();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.error("Session Timeout...Please Login Again")

    navigate("/login", { replace: true });
  };

  const resetTimer = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(logout, SESSION_TIMEOUT);
  };

  useEffect(() => {
    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click"
    ];

    events.forEach(event =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer();

    return () => {
      clearTimeout(timer.current);

      events.forEach(event =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, []);

  return null;
}