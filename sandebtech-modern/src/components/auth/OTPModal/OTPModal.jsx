import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { verifyOTP } from "../../../service/authService";
import useAuth from "../../../hooks/useAuth";
import OTPInput from "../OTPInput/OTPInput";
import "./OTPModal.css";
import Logo from "../../../assets/images/logo/logo.webp";

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
    const [error, setError] = useState("");
    const [verifying, setVerifying] = useState(false);
    // Incrementing this forces the countdown effect below to re-run and
    // start a fresh interval on every resend, not just on initial open.
    const [resendKey, setResendKey] = useState(0);

    const {
        login,
        setOtpOpen,
        setRegisterOpen,
        setSuccessOpen,
    } = useAuth();

    useEffect(() => {
        if (!open) return;

        setTimer(30);
        setError("");

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
    }, [open, resendKey]);

    const handleResend = () => {
        setError("");
        setResendKey((prev) => prev + 1);
        onResend();
    };

    const handleVerify = async () => {
        setError("");

        // Defensive check if otp is an array or string
        const code = Array.isArray(otp) ? otp.join("") : String(otp);

        if (code.length !== 6) {
            setError("Enter the complete 6-digit code.");
            return;
        }

        if (verifying || loading) return;

        try {
            setVerifying(true);
            const result = await verifyOTP(email, code);

            if (!result || !result.success) {
                setError(result?.message || "Invalid validation code provided.");
                return;
            }
            if (!result.newUser) {
                login({
                    ...result.userResponse,
                    token: result.token,
                });

                setOtpOpen(false);
                setSuccessOpen(true);
                return;
            }

            setOtpOpen(false);
            setRegisterOpen(true);

        } catch (err) {
            setError(err?.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setVerifying(false);
        }
    };

    return (
        /* AnimatePresence must explicitly wrap the conditional statement to catch the exit step */
        <AnimatePresence>
            {open && (
                <motion.div
                    className="otp-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="otp-modal"
                        initial={{ scale: 0.9, y: 30 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 30 }}
                        transition={{ duration: 0.25 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="otp-close" onClick={onClose} type="button">
                            <X size={22} />
                        </button>

                        <div className="login-logo">

                            <img src={Logo} alt="SandebTech Logo" />

                        </div>


                        <h2>Verify Email</h2>

                        <div className="modal-description text-slate-400">
                            <p>We have sent a 6-digit verification code to:</p>
                            <p className="font-semibold text-white">{email}</p> {/* ✅ GOOD: Siblings inside a <div> */}
                        </div>

                        <OTPInput value={otp} onChange={setOtp} />

                        {error && (
                            <span className="form-error" style={{ display: "block", marginTop: "10px" }}>
                                {error}
                            </span>
                        )}

                        <div className="otp-resend">
                            {timer > 0 ? (
                                <span>
                                    Resend OTP in{" "}
                                    <strong>00:{timer.toString().padStart(2, "0")}</strong>
                                </span>
                            ) : (
                                <button type="button" onClick={handleResend}>
                                    Resend OTP
                                </button>
                            )}
                        </div>

                        <button
                            className="otp-btn"
                            onClick={handleVerify}
                            type="button"
                            disabled={loading || verifying}
                        >
                            {loading || verifying ? "Verifying..." : "Verify OTP"}
                            <ArrowRight size={18} />
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default OTPModal;