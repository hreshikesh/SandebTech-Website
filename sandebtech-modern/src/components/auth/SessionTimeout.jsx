import { useEffect, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const IDLE_TIME = 30 * 60 * 1000;            // 30 minutes idle
const MAX_SESSION_TIME = 8 * 60 * 60 * 1000; // 8 hours max session

export default function SessionTimeout() {
    const navigate = useNavigate();
    const { user, logout, getSessionStartTime } = useAuth();
    const idleTimerRef = useRef(null);
    const sessionTimerRef = useRef(null);

    // Logout with reason
    const logoutUser = useCallback((reason = "Session expired") => {
        logout();

        toast.error(`${reason}. Please login again.`, {
            duration: 4000,
            position: "top-center",
        });

        navigate("/");
    }, [logout, navigate]);

    // Reset idle timer on activity
    const resetIdleTimer = useCallback(() => {
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

        idleTimerRef.current = setTimeout(() => {
            logoutUser("Inactive for too long");
        }, IDLE_TIME);
    }, [logoutUser]);

    // Check and setup max session timer
    const setupMaxSessionTimer = useCallback(() => {
        const sessionStart = getSessionStartTime();

        if (!sessionStart) return false;

        const elapsed = Date.now() - sessionStart;

        // Already exceeded
        if (elapsed >= MAX_SESSION_TIME) {
            logoutUser("Maximum session time reached");
            return true;
        }

        // Set timer for remaining time
        const remaining = MAX_SESSION_TIME - elapsed;

        if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);

        sessionTimerRef.current = setTimeout(() => {
            logoutUser("Maximum session time reached");
        }, remaining);

        return false;
    }, [getSessionStartTime, logoutUser]);

    // Main effect
    useEffect(() => {
        if (!user) return;

        // Check max session first
        if (setupMaxSessionTimer()) return;

        // Setup idle timer
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

            events.forEach((event) =>
                window.removeEventListener(event, resetIdleTimer)
            );
        };
    }, [user, resetIdleTimer, setupMaxSessionTimer]);

    return null;
}