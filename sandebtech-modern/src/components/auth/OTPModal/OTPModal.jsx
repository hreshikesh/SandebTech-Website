import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { verifyOTP } from "../../../service/authService";
import useAuth from "../../../hooks/useAuth";

import OTPInput from "../OTPInput/OTPInput";

import "./OTPModal.css";

function OTPModal({
    open,
    email,
    otp,
    setOtp,
    loading,
    onClose,
    onResend,
}) {
    const [timer, setTimer] = useState(30);

    const {
        login,
        setOtpOpen,
        setRegisterOpen,
        setSuccessOpen,
    } = useAuth();

    useEffect(() => {
        if (!open) return;

        setTimer(30);

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [open]);

    if (!open) return null;

    const handleVerify = async () => {

        const result = await verifyOTP(
            email,
            otp.join("")
        );

        if (!result.success) {
            alert(result.message);
            return;
        }

        if (result.existingUser) {

            login(result.user);

            setOtpOpen(false);

            setSuccessOpen(true);

            return;
        }

        setOtpOpen(false);

        setRegisterOpen(true);

    };

    return (
        <AnimatePresence>

            <motion.div
                className="otp-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >

                <motion.div
                    className="otp-modal"
                    initial={{ scale: .9, y: 30 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: .9, y: 30 }}
                    transition={{ duration: .25 }}
                    onClick={(e) => e.stopPropagation()}
                >

                    <button
                        className="otp-close"
                        onClick={onClose}
                    >
                        <X size={22} />
                    </button>

                    <div className="otp-logo">

                        ST

                    </div>

                    <h2>

                        Verify Email

                    </h2>

                    <p>

                        We've sent a 6-digit verification code to

                        <strong>{email}</strong>

                    </p>

                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                    />

                    <div className="otp-resend">

                        {timer > 0 ? (

                            <span>

                                Resend OTP in

                                <strong>

                                    {" "}
                                    00:{timer.toString().padStart(2, "0")}

                                </strong>

                            </span>

                        ) : (

                            <button
                                type="button"
                                onClick={onResend}
                            >
                                Resend OTP
                            </button>

                        )}

                    </div>

                    <button
                        className="otp-btn"
                        onClick={handleVerify}
                        disabled={loading}
                    >

                        {loading
                            ? "Verifying..."
                            : "Verify OTP"}

                        <ArrowRight size={18} />

                    </button>

                </motion.div>

            </motion.div>

        </AnimatePresence>
    );
}

export default OTPModal;