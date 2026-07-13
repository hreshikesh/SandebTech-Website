import { motion, AnimatePresence } from "framer-motion";
import { User, Building2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { isValidPhoneNumber } from "libphonenumber-js";

import PhoneInputField from "../../../components/auth/PhoneInputField";
import { register } from "../../../service/authService";
import useAuth from "../../../hooks/useAuth";

import "./RegisterModal.css";

const NAME_MAX_LENGTH = 20;
const COMPANY_MAX_LENGTH = 40;

function RegisterModal({
  open,
  loading,
}) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const [errors, setErrors] = useState({});

  const {
    login,
    setRegisterOpen,
    setSuccessOpen,
  } = useAuth();

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Name: letters + spaces only, blocks numbers/special chars as typed, max 20
    if (name === "name") {
      const cleaned = value
        .replace(/[^a-zA-Z\s]/g, "")
        .slice(0, NAME_MAX_LENGTH);

      setForm((prev) => ({ ...prev, name: cleaned }));
      return;
    }

    // Company: letters, numbers, spaces, & . , - only, max 40
    if (name === "company") {
      const cleaned = value
        .replace(/[^a-zA-Z0-9\s&.,-]/g, "")
        .slice(0, COMPANY_MAX_LENGTH);

      setForm((prev) => ({ ...prev, company: cleaned }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name is too short.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(form.email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }

    const rawDigits = form.phone ? form.phone.replace(/\D/g, "") : "";

    if (!form.phone || rawDigits.length <= 2) {
      newErrors.phone = "Phone number is required.";
    } else {
      try {
        if (!isValidPhoneNumber(form.phone)) {
          newErrors.phone = "Enter a valid phone number.";
        }
      } catch (err) {
        newErrors.phone = "Enter a valid phone number.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {

    if (!validateForm()) return;

    const result = await register(form);

    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        form: result.message || "Registration failed. Please try again.",
      }));
      return;
    }

    login(result.user);

    setRegisterOpen(false);

    setSuccessOpen(true);

  };

  return (

    <AnimatePresence>

      <motion.div
        className="register-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >

        <motion.div
          className="register-modal"
          initial={{ scale: .9, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: .9, y: 40 }}
          transition={{ duration: .25 }}
        >

          <div className="register-logo">

            ST

          </div>

          <h2>

            Complete Your Profile

          </h2>

          <p>

            Just one last step before you continue.

          </p>

          <div className="register-input">

            <User size={18} />

            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              maxLength={NAME_MAX_LENGTH}
            />

          </div>
          {errors.name && <span className="form-error">{errors.name}</span>}

          <div className="register-input">

            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={form.email}
              onChange={handleChange}
            />

          </div>
          {errors.email && <span className="form-error">{errors.email}</span>}

          <PhoneInputField
            value={form.phone}
            onChange={(phone) =>
              setForm((prev) => ({
                ...prev,
                phone,
              }))
            }
          />
          {errors.phone && <span className="form-error">{errors.phone}</span>}

          <div className="register-input">

            <Building2 size={18} />

            <input
              type="text"
              placeholder="Company (Optional)"
              name="company"
              value={form.company}
              onChange={handleChange}
              maxLength={COMPANY_MAX_LENGTH}
            />

          </div>

          {errors.form && (
            <span className="form-error">{errors.form}</span>
          )}

          <button
            className="register-btn"
            onClick={handleRegister}
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Create Account"}

            <ArrowRight size={18} />

          </button>

        </motion.div>

      </motion.div>

    </AnimatePresence>

  );

}

export default RegisterModal;