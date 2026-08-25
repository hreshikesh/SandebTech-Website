import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

export const AuthContext = createContext();

const USER_KEY = "sandebtech-user";
const TOKEN_KEY = "token";
const SESSION_START_KEY = "session_start_time";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = sessionStorage.getItem(USER_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return sessionStorage.getItem(TOKEN_KEY) || null;
  });

  const [pendingAction, setPendingAction] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const login = useCallback((userData) => {
    // Fresh session only
    sessionStorage.clear();

    sessionStorage.setItem(SESSION_START_KEY, Date.now().toString());
    sessionStorage.setItem(USER_KEY, JSON.stringify(userData));

    const extractedToken =
      userData?.token || userData?.accessToken || null;

    if (extractedToken) {
      sessionStorage.setItem(TOKEN_KEY, extractedToken);
      setToken(extractedToken);
    } else {
      // Still mark session as authenticated if API returns user without token field
      sessionStorage.setItem(TOKEN_KEY, "authenticated");
      setToken("authenticated");
    }

    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    // Session-only cleanup
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(SESSION_START_KEY);
    // Or wipe entire tab session:
    // sessionStorage.clear();

    setUser(null);
    setToken(null);
    setLoginOpen(false);
    setOtpOpen(false);
    setRegisterOpen(false);
    setSuccessOpen(false);
    setEmail("");
    setOtp(["", "", "", "", "", ""]);
    setPendingAction(null);
  }, []);

  const getSessionStartTime = useCallback(() => {
    const startTime = sessionStorage.getItem(SESSION_START_KEY);
    return startTime ? parseInt(startTime, 10) : null;
  }, []);

  const isSessionValid = useCallback(
    (maxSessionTime) => {
      const startTime = getSessionStartTime();
      if (!startTime) return false;
      return Date.now() - startTime < maxSessionTime;
    },
    [getSessionStartTime]
  );

  useEffect(() => {
    const forceLogout = () => logout();
    window.addEventListener("forceLogout", forceLogout);
    return () => window.removeEventListener("forceLogout", forceLogout);
  }, [logout]);

  const executePendingAction = useCallback(() => {
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  }, [pendingAction]);

  const requireAuth = useCallback(
    (callback) => {
      if (user || token) {
        callback();
        return;
      }
      setPendingAction(() => callback);
      setLoginOpen(true);
    },
    [user, token]
  );

  const openLogin = useCallback(() => setLoginOpen(true), []);

  const closeAll = useCallback(() => {
    setLoginOpen(false);
    setOtpOpen(false);
    setRegisterOpen(false);
    setSuccessOpen(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      token,
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
    }),
    [
      user,
      token,
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
      email,
      otp,
      openLogin,
      closeAll,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);