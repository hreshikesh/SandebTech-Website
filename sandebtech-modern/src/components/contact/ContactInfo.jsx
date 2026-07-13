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
function ContactInfo() {
  const { user } = useAuth();
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
  const { requireAuth } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 1. Name Input: Strip out numbers completely so they don't show up
    if (name === "name") {
      const cleanName = value.replace(/[0-9]/g, "");
      setForm({ ...form, [name]: cleanName });
      return;
    }


    // Standard fallback for all other fields
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Name Validation
    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    // 2. Email Validation
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    // Phone Validation (Checks length on submit if they started typing)
    if (!isValidPhoneNumber(form.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    // Subject Validation
    if (!form.subject.trim()) {
      newErrors.subject = "Subject is required.";
    }

    // Message Validation
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

      await new Promise(resolve =>
        setTimeout(resolve, 1800)
      );

      setShowSuccess(true);

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
              <Phone />
              <div>
                <h4>Phone</h4>
                <p>+91 XXXXX XXXXX</p>
              </div>
            </div>

            <div className="info-card">
              <Mail />
              <div>
                <h4>Email</h4>
                <p>info@sandebtech.com</p>
              </div>
            </div>

            <div className="info-card">
              <MapPin />
              <div>
                <h4>Office</h4>
                <p>Mangalore, Karnataka, India</p>
              </div>
            </div>

            <div className="info-card">
              <Clock />
              <div>
                <h4>Working Hours</h4>
                <p>Monday - Saturday</p>
                <p>9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - FORM */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Send an Inquiry</h3>

            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={!!user}
              required
            />
            {errors.name && (
              <span className="form-error">{errors.name}</span>
            )}

            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              disabled={!!user}
            />
            {errors.email && (
              <span className="form-error">{errors.email}</span>
            )}

            <PhoneInputField
              value={form.phone}
              onChange={(phone) =>
                setForm({
                  ...form,
                  phone,
                })
                
              }
              disabled={!!user}
              required
            />
            {errors.phone && (
              <span className="form-error">{errors.phone}</span>
            )}

            <input
              type="text"
              placeholder="Company Name"
              name="company"
              value={form.company}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
            />
            {errors.subject && (
              <span className="form-error">{errors.subject}</span>
            )}

            <textarea
              rows="6"
              placeholder="Tell us about your project..."
              name="message"
              value={form.message}
              onChange={handleChange}
              required
            />
            <div className="message-footer">
              {errors.message && (
                <span className="form-error">{errors.message}</span>
              )}
              <span>{form.message.length}/500</span>
            </div>

            {submitError && (
              <div className="form-error submit-error">{submitError}</div>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Inquiry"}
              <ArrowRight size={18} />
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