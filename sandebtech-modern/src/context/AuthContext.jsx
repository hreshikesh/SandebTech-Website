import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("sandebtech-user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [pendingAction, setPendingAction] = useState(null);
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

    const [loginOpen, setLoginOpen] = useState(false);
    const [otpOpen, setOtpOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);

    const [email, setEmail] = useState("");

    const [otp, setOtp] = useState([
        "",
        "",
        "",
        "",
        "",
        "",
    ]);

    const login = (userData) => {
        setUser(userData);

        localStorage.setItem(
            "sandebtech-user",
            JSON.stringify(userData)
        );
    };

  const logout = () => {

    setUser(null);

    localStorage.removeItem("sandebtech-user");

    localStorage.removeItem("token");

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

export const useAuth = () =>
    useContext(AuthContext);