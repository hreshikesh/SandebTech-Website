import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import "./ProtectedRoute.css";

export default function ProtectedRoute({ children }) {
  const { user, token, setLoginOpen } = useAuth();

  const isAuthenticated = Boolean(user || token);
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
    return (
      <div className="protected-route-container">
        <p className="protected-route-text">
          Please log in to access the meeting
        </p>
      </div>
    );
  }

  return children;
}