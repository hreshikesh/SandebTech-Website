import { useEffect, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const IDLE_TIME = 30 * 60 * 1000;            // 30 minutes
const MAX_SESSION_TIME = 8 * 60 * 60 * 1000; // 8 hours

export default function SessionTimeout() {
    const navigate = useNavigate();
    const { user, logout, getSessionStartTime } = useAuth();
    const idleTimerRef = useRef(null);
    const sessionTimerRef = useRef(null);
    const warningToastRef = useRef(null);

    const logoutUser = useCallback((reason = "Session expired") => {
        logout();

        toast.error(`${reason}. Please login again.`, {
            duration: 4000,
            position: "top-center",
        });

        navigate("/");
    }, [logout, navigate]);

    const resetIdleTimer = useCallback(() => {
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

        // Warn 5 minutes before idle logout
        if (warningToastRef.current) clearTimeout(warningToastRef.current);

        warningToastRef.current = setTimeout(() => {
            toast("You will be logged out in 5 minutes due to inactivity", {
                icon: "⚠️",
                duration: 8000,
                position: "top-center",
            });
        }, IDLE_TIME - 5 * 60 * 1000);

        idleTimerRef.current = setTimeout(() => {
            logoutUser("Inactive for too long");
        }, IDLE_TIME);
    }, [logoutUser]);

    const setupMaxSessionTimer = useCallback(() => {
        const sessionStart = getSessionStartTime();
        if (!sessionStart) return false;

        const elapsed = Date.now() - sessionStart;

        if (elapsed >= MAX_SESSION_TIME) {
            logoutUser("Maximum session time reached");
            return true;
        }

        const remaining = MAX_SESSION_TIME - elapsed;

        if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);

        sessionTimerRef.current = setTimeout(() => {
            logoutUser("Maximum session time reached");
        }, remaining);

        return false;
    }, [getSessionStartTime, logoutUser]);

    useEffect(() => {
        if (!user) return;

        if (setupMaxSessionTimer()) return;

        const events = [
            "mousemove",
            "mousedown",
            "keypress",
            "scroll",
            "touchstart",
            "click",
        ];

        resetIdleTimer();

        events.forEach((event) =>
            window.addEventListener(event, resetIdleTimer)
        );

        return () => {
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);
            if (warningToastRef.current) clearTimeout(warningToastRef.current);

            events.forEach((event) =>
                window.removeEventListener(event, resetIdleTimer)
            );
        };
    }, [user, resetIdleTimer, setupMaxSessionTimer]);

    return null;
}