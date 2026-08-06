// DownloadFormModal.jsx
import React, { useState, useEffect } from "react";
import { X, Download, User, Mail, Loader2, CheckCircle } from "lucide-react";
import PhoneInputField from "../auth/PhoneInputField";
import { submitDownloadInfo } from "../../service/downloadService";
import "./DownloadFormModal.css";

const initialForm = {
  name: "",
  email: "",
  phone: "",
};

const initialErrors = {
  name: "",
  email: "",
  phone: "",
};

export default function DownloadFormModal({
  isOpen,
  onClose,
  pdfUrl,
  title,
  user = null,
}) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const resolvedTitle = (title && title.trim()) || "Document";

  useEffect(() => {
    if (isOpen) {
      setForm({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
      });
      setErrors(initialErrors);
      setIsSuccess(false);
      setServerError("");
      setIsSubmitting(false);
    }
  }, [isOpen, user]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = original;
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !pdfUrl) return null;

  // ── Validators ──────────────────────────────────────────────
  const validateName = (value) => {
    if (!value.trim()) return "Full name is required.";
    if (/\d/.test(value)) return "Name must not contain numbers.";
    if (/[^a-zA-Z\s.'-]/.test(value))
      return "Name must not contain special characters.";
    if (value.trim().length < 2) return "Name must be at least 2 characters.";
    if (value.trim().length > 60) return "Name must be under 60 characters.";
    return "";
  };

  const validateEmail = (value) => {
    if (!value.trim()) return "Email address is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(value.trim()))
      return "Please enter a valid email address.";
    return "";
  };

  // ✅ Phone is OPTIONAL — only validate if user typed something meaningful
  const isPhoneMeaningful = (value) => {
    if (!value) return false;
    const digits = value.replace(/\D/g, "");
    // Ignore country code prefix by itself (e.g. "+91" alone shouldn't trigger validation)
    return digits.length > 3;
  };

  const validatePhone = (value) => {
    if (!isPhoneMeaningful(value)) return ""; // optional — no error
    const digits = value.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15)
      return "Enter a valid phone number (7–15 digits).";
    return "";
  };

  const validateAll = () => {
    const newErrors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleBlur = (field) => {
    const validators = {
      name: validateName,
      email: validateEmail,
      phone: validatePhone,
    };
    setErrors((prev) => ({ ...prev, [field]: validators[field](form[field]) }));
  };

  // ── Submit ──────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validateAll()) return;

    setIsSubmitting(true);
    try {
      await submitDownloadInfo({
        name: form.name.trim(),
        email: form.email.trim(),
        // ✅ Only send phone if user actually entered a real number
        phone: isPhoneMeaningful(form.phone) ? form.phone : null,
        documentTitle: resolvedTitle,
        documentUrl: pdfUrl,
      });
      setIsSuccess(true);

      setTimeout(() => {
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = `${resolvedTitle}.pdf`;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 800);
    } catch (err) {
      setServerError(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success Screen ──────────────────────────────────────────
  if (isSuccess) {
    return (
      <div
        className="dlf-overlay"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dlf-title"
      >
        <div className="dlf-container" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="dlf-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div className="dlf-success">
            <CheckCircle size={56} className="dlf-success-icon" />
            <h3>Download Starting…</h3>
            <p>
              Thank you, <strong>{form.name}</strong>! Your document{" "}
              <strong>“{resolvedTitle}”</strong> is downloading now.
            </p>
            <button type="button" className="dlf-submit-btn" onClick={onClose}>
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Form ───────────────────────────────────────────────
  return (
    <div
      className="dlf-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dlf-title"
    >
      <div className="dlf-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className="dlf-header">
          <div className="dlf-header-icon">
            <Download size={20} aria-hidden="true" />
          </div>
          <div className="dlf-header-text">
            <h2 id="dlf-title">Download Document</h2>
            <p title={resolvedTitle}>{resolvedTitle}</p>
          </div>
          <button
            type="button"
            className="dlf-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </header>

        {/* Form */}
        <form
          className="dlf-form"
          onSubmit={handleSubmit}
          noValidate
          aria-describedby={serverError ? "dlf-server-error" : undefined}
        >
          {serverError && (
            <div className="dlf-server-error" id="dlf-server-error" role="alert">
              {serverError}
            </div>
          )}

          {/* Full Name */}
          <div className="form-input-group">
            <label htmlFor="dlf-name" className="form-label">
              Full Name <span className="form-required">*</span>
            </label>
            <div className={`form-input-wrapper ${errors.name ? "has-error" : ""}`}>
              <User size={16} className="form-input-icon" aria-hidden="true" />
              <input
                id="dlf-name"
                type="text"
                className="form-input"
                placeholder="e.g. Ravi Kumar"
                value={form.name}
                disabled={!!user?.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  if (errors.name)
                    setErrors({ ...errors, name: validateName(e.target.value) });
                }}
                onBlur={() => handleBlur("name")}
                autoComplete="name"
                aria-describedby={errors.name ? "dlf-name-error" : undefined}
                aria-invalid={!!errors.name}
              />
            </div>
            {errors.name && (
              <span className="form-error" id="dlf-name-error" role="alert">
                {errors.name}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="form-input-group">
            <label htmlFor="dlf-email" className="form-label">
              Email Address <span className="form-required">*</span>
            </label>
            <div className={`form-input-wrapper ${errors.email ? "has-error" : ""}`}>
              <Mail size={16} className="form-input-icon" aria-hidden="true" />
              <input
                id="dlf-email"
                type="email"
                className="form-input"
                placeholder="e.g. ravi@example.com"
                value={form.email}
                disabled={!!user?.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  if (errors.email)
                    setErrors({
                      ...errors,
                      email: validateEmail(e.target.value),
                    });
                }}
                onBlur={() => handleBlur("email")}
                autoComplete="email"
                aria-describedby={errors.email ? "dlf-email-error" : undefined}
                aria-invalid={!!errors.email}
              />
            </div>
            {errors.email && (
              <span className="form-error" id="dlf-email-error" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          {/* Phone — OPTIONAL */}
          <div className="form-input-group">
            <label className="form-label">
              Mobile Number <span className="form-optional">(Optional)</span>
            </label>
            <PhoneInputField
              value={form.phone}
              onChange={(phone) => {
                setForm({ ...form, phone });
                if (errors.phone)
                  setErrors({ ...errors, phone: validatePhone(phone) });
              }}
              disabled={!!user?.phone}
              onBlur={() => handleBlur("phone")}
              hasError={!!errors.phone}
              required={false}
            />
            {errors.phone && (
              <span className="form-error" role="alert">
                {errors.phone}
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="dlf-submit-btn"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="dlf-btn-spinner" aria-hidden="true" />
                Submitting…
              </>
            ) : (
              <>
                <Download size={18} aria-hidden="true" />
                Download Now
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}