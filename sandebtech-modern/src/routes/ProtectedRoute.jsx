import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, token, setLoginOpen } = useAuth();
  const prompted = useRef(false);

  const isAuthenticated = Boolean(user || token);

  useEffect(() => {
    if (!isAuthenticated && !prompted.current) {
      prompted.current = true;
      setLoginOpen(true);
    }

    if (isAuthenticated) {
      prompted.current = false;
    }
  }, [isAuthenticated, setLoginOpen]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
}