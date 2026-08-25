import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, token, setLoginOpen } = useAuth();

  const isAuthenticated = Boolean(user || token);
  const promptedRef = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !promptedRef.current) {
      promptedRef.current = true;
      setLoginOpen(true);
    }

    if (isAuthenticated) {
      promptedRef.current = false;
    }
  }, [isAuthenticated, setLoginOpen]);

  // Do not render Meeting until authenticated.
  // LoginModal is rendered globally by AuthManager.
  if (!isAuthenticated) {
    return null;
  }

  return children;
}