import { createContext, useContext, useEffect, useState, useCallback } from "react";

export const AuthContext = createContext();

const SESSION_START_KEY = "session_start_time";
const TAB_CLOSED_KEY = "tab_closed";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("sandebtech-user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [pendingAction, setPendingAction] = useState(null);

    const [loginOpen, setLoginOpen] = useState(false);
    const [otpOpen, setOtpOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);

    const [email, setEmail] = useState("");

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    // Login function - sets user and session start time
    const login = useCallback((userData) => {
        // Clear any old session data
        localStorage.removeItem(SESSION_START_KEY);
        sessionStorage.removeItem(TAB_CLOSED_KEY);

        // Set new session start time
        localStorage.setItem(SESSION_START_KEY, Date.now().toString());

        // Set user
        setUser(userData);
        localStorage.setItem("sandebtech-user", JSON.stringify(userData));
    }, []);

    // Logout function - clears all session data
    const logout = useCallback(() => {
        // Clear session data
        localStorage.removeItem(SESSION_START_KEY);
        sessionStorage.removeItem(TAB_CLOSED_KEY);
        localStorage.removeItem("sandebtech-user");
        localStorage.removeItem("token");

        // Reset state
        setUser(null);
        setLoginOpen(false);
        setOtpOpen(false);
        setRegisterOpen(false);
        setSuccessOpen(false);
    }, []);

    // Get session start time
    const getSessionStartTime = useCallback(() => {
        const startTime = localStorage.getItem(SESSION_START_KEY);
        return startTime ? parseInt(startTime, 10) : null;
    }, []);

    // Check if session is valid (not too old)
    const isSessionValid = useCallback((maxSessionTime) => {
        const startTime = getSessionStartTime();
        
        if (!startTime) return false;
        
        const elapsed = Date.now() - startTime;
        return elapsed < maxSessionTime;
    }, [getSessionStartTime]);

    // Handle tab close detection
    useEffect(() => {
        if (!user) return;

        const handleBeforeUnload = () => {
            sessionStorage.setItem(TAB_CLOSED_KEY, "true");
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [user]);

    // Check on load if tab was closed
    useEffect(() => {
        if (!user) return;

        const tabClosed = sessionStorage.getItem(TAB_CLOSED_KEY);

        if (tabClosed === "true") {
            sessionStorage.removeItem(TAB_CLOSED_KEY);
            logout();
        }
    }, [user, logout]);

    // Force logout event listener
    useEffect(() => {
        const forceLogout = () => logout();

        window.addEventListener("forceLogout", forceLogout);

        return () => {
            window.removeEventListener("forceLogout", forceLogout);
        };
    }, [logout]);

    const executePendingAction = () => {
        if (pendingAction) {
            pendingAction();
            setPendingAction(null);
        }
    };

    const requireAuth = (callback) => {
        if (user) {
            callback();
            return;
        }

        setPendingAction(() => callback);
        setLoginOpen(true);
    };

    const openLogin = () => {
        setLoginOpen(true);
    };

    const closeAll = () => {
        setLoginOpen(false);
        setOtpOpen(false);
        setRegisterOpen(false);
        setSuccessOpen(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                requireAuth,
                executePendingAction,

                // Session helpers
                getSessionStartTime,
                isSessionValid,

                // Modal states
                loginOpen,
                otpOpen,
                registerOpen,
                successOpen,

                setLoginOpen,
                setOtpOpen,
                setRegisterOpen,
                setSuccessOpen,

                email,
                setEmail,

                otp,
                setOtp,

                openLogin,
                closeAll,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);