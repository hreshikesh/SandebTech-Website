import "./ContactInfo.css";
import { useState, useEffect } from "react";
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

    if (!form.subject.trim()) {
      newErrors.subject = "Subject is required.";
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
        message: form.message
      });

      setForm(initialForm);
      setErrors({});
      setShowSuccess(true);
    } catch (error) {
      setSubmitError(error?.response?.data?.message || "Failed to submit request parameters. Please verify your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    requireAuth(submitForm);
  };

  useEffect(() => {
    if (!user) return;
    setForm((prev) => ({
      ...prev,
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      company: user.company || "",
    }));
  }, [user]);

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
                <p>+91 XXXXX XXXXX</p>
              </div>
            </div>

            <div className="info-card">
              <Mail size={20} />
              <div>
                <h4>Email</h4>
                <p>info@sandebtech.com</p>
              </div>
            </div>

            <div className="info-card">
              <MapPin size={20} />
              <div>
                <h4>Office</h4>
                <p>Mangalore, Karnataka, India</p>
              </div>
            </div>

            <div className="info-card">
              <Clock size={20} />
              <div>
                <h4>Working Hours</h4>
                <p>Monday - Saturday</p>
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

            <div className="form-input-group">
              <input
                type="text"
                placeholder="Subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
              />
              {errors.subject && <span className="form-error">{errors.subject}</span>}
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