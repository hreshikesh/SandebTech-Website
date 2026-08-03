import { createContext, useContext, useEffect, useState, useCallback } from "react";

export const AuthContext = createContext();

const USER_KEY = "sandebtech-user";
const TOKEN_KEY = "token";
const SESSION_START_KEY = "session_start_time";

export function AuthProvider({ children }) {

    // Use sessionStorage so closing tab/browser clears it automatically
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem(USER_KEY);
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [pendingAction, setPendingAction] = useState(null);
    const [loginOpen, setLoginOpen] = useState(false);
    const [otpOpen, setOtpOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const login = useCallback((userData) => {
        // Clear old session
        sessionStorage.clear();

        // Set session start
        sessionStorage.setItem(SESSION_START_KEY, Date.now().toString());

        // Store user and token in sessionStorage only
        sessionStorage.setItem(USER_KEY, JSON.stringify(userData));

        if (userData.token) {
            sessionStorage.setItem(TOKEN_KEY, userData.token);
        }

        setUser(userData);
    }, []);

    const logout = useCallback(() => {
        // Clear everything
        sessionStorage.clear();
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(SESSION_START_KEY);

        // Reset state
        setUser(null);
        setLoginOpen(false);
        setOtpOpen(false);
        setRegisterOpen(false);
        setSuccessOpen(false);
    }, []);

    const getSessionStartTime = useCallback(() => {
        const startTime = sessionStorage.getItem(SESSION_START_KEY);
        return startTime ? parseInt(startTime, 10) : null;
    }, []);

    const isSessionValid = useCallback((maxSessionTime) => {
        const startTime = getSessionStartTime();
        if (!startTime) return false;
        const elapsed = Date.now() - startTime;
        return elapsed < maxSessionTime;
    }, [getSessionStartTime]);

    // Force logout event listener
    useEffect(() => {
        const forceLogout = () => logout();
        window.addEventListener("forceLogout", forceLogout);
        return () => window.removeEventListener("forceLogout", forceLogout);
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

    const openLogin = () => setLoginOpen(true);

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
                getSessionStartTime,
                isSessionValid,
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