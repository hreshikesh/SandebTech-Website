import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Mail } from "lucide-react";
import { sendOTP } from "../../../service/authService";
import useAuth from "../../../hooks/useAuth";
import "./LoginModal.css";
import { useState } from "react";

function LoginModal({
    open,
    onClose,
}) {
    const {
        email,
        setEmail,
        setLoginOpen,
        setOtpOpen,
    } = useAuth();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const handleContinue = async () => {

        setError("");

        if (!email.trim()) {

            setError("Email is required.");

            return;

        }

         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (!emailRegex.test(email)) {

            setError("Enter a valid email.");

            return;

        }

        try {

            setLoading(true);

            const result = await sendOTP(email);

            if (!result.success) {

                setError(result.message);

                return;

            }

            setLoginOpen(false);

            setOtpOpen(true);

        } finally {

            setLoading(false);

        }

    };

    return (

        <AnimatePresence>

            <motion.div
                className="login-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >

                <motion.div
                    className="login-modal"
                    initial={{ scale: 0.9, y: 40 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 40 }}
                    transition={{ duration: .25 }}
                    onClick={(e) => e.stopPropagation()}
                >

                    <button
                        className="login-close"
                        onClick={onClose}
                    >
                        <X size={22} />
                    </button>

                    <div className="login-logo">

                        ST

                    </div>

                    <h2>Welcome Back</h2>

                    <p>
                        Sign in to continue using
                        SandebTech Engineering Portal.
                    </p>

                    <div className="login-input">

                        <Mail size={18} />

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>
                    {
                        error && (
                            <span className="form-error">
                                {error}
                            </span>
                        )
                    }

                    <button
                        className="login-btn"
                        onClick={handleContinue}
                        disabled={loading}
                    >

                        {loading
                            ? "Sending OTP..."
                            : "Continue"}

                        <ArrowRight size={18} />

                    </button>

                    <small>

                        We'll send a One-Time Password
                        to your email.

                    </small>

                </motion.div>

            </motion.div>

        </AnimatePresence>
    );
}

export default LoginModal;