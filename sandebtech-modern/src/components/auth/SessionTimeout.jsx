import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SESSION_TIMEOUT = 30 * 60 * 1000;

export default function SessionTimeout({ children }) {

  const navigate = useNavigate();
  const timer = useRef(null);

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.error("Session expired. Please login again.");

    navigate("/", { replace: true });

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

  return <>{children}</>;
}