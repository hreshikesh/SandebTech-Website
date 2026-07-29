import "./ContactInfo.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import ContactSuccessModal from "./ContactSuccessModal";
import PhoneInputField from "../auth/PhoneInputField";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useAuth } from "../../context/AuthContext";
import { submitContact } from "../../service/contactApi";

function ContactInfo() {
  const { user, requireAuth } = useAuth();
  const location = useLocation();

  const initialForm = {
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      const cleanName = value.replace(/[0-9]/g, "");
      setForm({ ...form, [name]: cleanName });
      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.phone || !isValidPhoneNumber(form.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!form.subject || !form.subject.trim()) {
      newErrors.subject = "Please select or specify a subject.";
    }

    if (form.message.trim().length < 20) {
      newErrors.message = "Message should contain at least 20 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async () => {
    setSubmitError("");
    if (!validateForm()) return;

    setLoading(true);
    try {
      await submitContact({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        subject: form.subject,
        message: form.message,
      });

      setForm(initialForm);
      setErrors({});
      setShowSuccess(true);
    } catch (error) {
      setSubmitError(
        error?.response?.data?.message ||
        "Failed to submit request parameters. Please verify your connection."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    requireAuth(submitForm);
  };

  // Populate User Info and Navigation State (Pre-filled Subject & Message)
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      ...(user && {
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        company: user.company || prev.company,
      }),
      ...(location.state?.subject && { subject: location.state.subject }),
      ...(location.state?.message && { message: location.state.message }),
    }));
  }, [user, location.state]);

  return (
    <section className="contact-section">
      <div className="container">
        <div className="contact-grid">
          {/* LEFT PANEL */}
          <div className="contact-details">
            <span className="section-badge">CONTACT</span>
            <h2>We'd Love to Hear From You</h2>
            <p>
              Whether you have a project inquiry, require engineering
              consultation, or would like to know more about our solutions, our
              team is ready to assist you.
            </p>

            <div className="info-card">
              <Phone size={20} />
              <div>
                <h4>Phone</h4>
                <p>+91 80-49536469</p>
              </div>
            </div>

            <div className="info-card">
              <Mail size={20} />
              <div>
                <h4>Email</h4>
                <p>contact@sandebtech.com</p>
              </div>
            </div>

            <div className="info-card">
              <MapPin size={20} />
              <div>
                <h4>Office</h4>
                <p>SANDEB TECH PVT LTD
                  166 5th Cross KEB Layout Sanjaynagar
                  Bangalore(Bengaluru) -560094, India</p>
              </div>
            </div>

            <div className="info-card">
              <Clock size={20} />
              <div>
                <h4>Working Hours</h4>
                <p>Monday - Friday</p>
                <p>9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - FORM */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <h3>Send an Inquiry</h3>

            <div className="form-input-group">
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-input-group">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-input-group">
              <PhoneInputField
                value={form.phone}
                onChange={(phone) => setForm({ ...form, phone })}
                disabled={!!user}
                required
              />
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>

            <div className="form-input-group">
              <input
                type="text"
                placeholder="Company Name"
                name="company"
                value={form.company}
                onChange={handleChange}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px", width: "100%", boxSizing: "border-box" }}>
              <label htmlFor="subject" style={{ fontWeight: "500", fontSize: "14px", color: "#374151" }}>
                What would you like to discuss? <span style={{ color: "#ef4444" }}>*</span>
              </label>

              <select
                id="subject"
                name="subject"
                value={
                  ["Shipflow Inquiry", "CAESES & Lotus Inquiry", "HVAC Inquiry"].includes(form.subject)
                    ? form.subject
                    : form.subject ? "Other" : ""
                }
                onChange={(e) => {
                  const val = e.target.value;
                  if (val !== "Other") {
                    handleChange(e);
                  } else {
                    handleChange({ target: { name: "subject", value: "" } });
                  }
                }}
                required
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                  padding: "12px 14px",
                  fontSize: "16px", // Prevents mobile browser auto-zoom
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  backgroundColor: "#ffffff",
                  color: "#1f2937",
                  outline: "none",
                  cursor: "pointer",
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  appearance: "none", // Ensures cross-browser styling consistency on mobile
                  backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.364%22%20height%3D%22292.364%22%3E%3Cpath%20fill%3D%22%236B7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 14px center",
                  backgroundSize: "12px",
                  paddingRight: "36px",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6";
                  e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.15)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
                }}
              >
                <option value="" disabled>Please select a subject...</option>
                <option value="Shipflow Inquiry">Shipflow Inquiry</option>
                <option value="CAESES & Lotus Inquiry">CAESES & Lotus Inquiry</option>
                <option value="HVAC Inquiry">HVAC Inquiry</option>
                <option value="Other">Other</option>
              </select>

              {!["Shipflow Inquiry", "CAESES & Lotus Inquiry", "HVAC Inquiry"].includes(form.subject) && (
                <input
                  type="text"
                  placeholder="Please specify your subject..."
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                    padding: "12px 14px",
                    fontSize: "16px", // Prevents mobile browser auto-zoom
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    backgroundColor: "#ffffff",
                    color: "#1f2937",
                    outline: "none",
                    marginTop: "4px",
                    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3b82f6";
                    e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
                  }}
                />
              )}

              {errors.subject && (
                <span style={{ fontSize: "12px", color: "#ef4444", marginTop: "2px", fontWeight: "400" }}>
                  {errors.subject}
                </span>
              )}
            </div>
            <div className="form-input-group">
              <textarea
                rows="6"
                placeholder="Tell us about your project..."
                name="message"
                value={form.message}
                onChange={handleChange}
                maxLength={500}
                required
              />
              <div className="message-footer">
                {errors.message ? (
                  <span className="form-error">{errors.message}</span>
                ) : (
                  <span></span>
                )}
                <span className="char-counter">{form.message.length}/500</span>
              </div>
            </div>

            {submitError && (
              <div className="form-error submit-error-alert">{submitError}</div>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Inquiry"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <ContactSuccessModal
            open={showSuccess}
            onClose={() => setShowSuccess(false)}
          />
        </div>
      </div>
    </section>
  );
}

export default ContactInfo;