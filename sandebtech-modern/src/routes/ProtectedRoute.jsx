import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
    const { user, token, setLoginOpen } = useAuth();

    const isAuthenticated = Boolean(user && token);

    const hasPrompted = useRef(false);

    useEffect(() => {
        if (!isAuthenticated && !hasPrompted.current) {
            hasPrompted.current = true;
            setLoginOpen(true);
        }
    }, [isAuthenticated, setLoginOpen]);

    useEffect(() => {
        if (isAuthenticated) {
            hasPrompted.current = false;
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return null;
    }

    return children;
}