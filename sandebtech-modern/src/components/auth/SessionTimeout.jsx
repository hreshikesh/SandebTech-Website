import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const IDLE_TIME = 30 *60* 1000;

export default function SessionTimeout() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    useEffect(() => {
        if (!user) return;

        let timer;

        const logoutUser = () => {
            logout();

            toast.error("Session expired. Please login again.");

            navigate("/");
        };

        const resetTimer = () => {
            clearTimeout(timer);
            timer = setTimeout(logoutUser, IDLE_TIME);
        };

        const events = [
            "mousemove",
            "mousedown",
            "keypress",
            "scroll",
            "touchstart",
            "click",
        ];

        events.forEach((event) =>
            window.addEventListener(event, resetTimer)
        );

        resetTimer();

        return () => {
            clearTimeout(timer);

            events.forEach((event) =>
                window.removeEventListener(event, resetTimer)
            );
        };
    }, [user, logout, navigate]);

    return null;
}