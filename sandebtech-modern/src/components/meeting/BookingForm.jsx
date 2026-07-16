import "./BookingForm.css";
import { useState, useEffect } from "react";
import { bookMeeting } from "../../service/meetingApi";
import PhoneInputField from "../auth/PhoneInputField";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useAuth } from "../../context/AuthContext";
import { toLocalDateString } from "../../utils/dateUtils";
import { toast } from "react-hot-toast";

// 1. Import React Select
import Select from "react-select";

// 2. Define options for react-select
const meetingModeOptions = [
  { value: "GOOGLE_MEET", label: "Google Meet" },
  { value: "IN_PERSON", label: "In Person" },
  { value: "PHONE_CALL", label: "Phone Call" },
];

function BookingForm({ selectedDate, selectedSlot, setSelectedSlot, onBookingSuccess }) {
  const { user, requireAuth } = useAuth();

  const initialForm = {
    name: "",
    company: "",
    email: "",
    phone: "",
    purpose: "",
    meetingMode: "GOOGLE_MEET", // Keeping value as string in state
    notes: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      const cleanName = value.replace(/[0-9]/g, "");
      setFormData((prev) => ({ ...prev, [name]: cleanName }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Pre-configured custom theme styles to perfectly match your inputs
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: "3px 4px",
      borderRadius: "12px",
      borderColor: state.isFocused ? "#0f4c81" : "#dbe4ee",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(15, 76, 129, 0.12)" : "none",
      transition: "0.3s",
      fontFamily: "inherit",
      fontSize: "15px",
      cursor: "pointer",
      "&:hover": {
        borderColor: state.isFocused ? "#0f4c81" : "#cbd5e1",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? "#0f4c81" 
        : state.isFocused 
        ? "#f8fafc" 
        : "#ffffff",
      color: state.isSelected ? "#ffffff" : "#1e293b",
      fontSize: "15px",
      cursor: "pointer",
    }),
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    const rawDigits = formData.phone ? formData.phone.replace(/\D/g, "") : "";
    if (!formData.phone || rawDigits.length <= 2) {
      newErrors.phone = "Phone number is required.";
    } else {
      try {
        if (!isValidPhoneNumber(formData.phone)) {
          newErrors.phone = "Please enter a valid phone number.";
        }
      } catch (err) {
        newErrors.phone = "Please enter a valid phone number.";
      }
    }
    if (!formData.purpose.trim()) newErrors.purpose = "Purpose of the meeting is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatTime = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    let h = Number(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${minute} ${ampm}`;
  };

  const submitBooking = async () => {
    setLoading(true);
    setSubmitError("");
    try {
      await bookMeeting({
        meetingDate: toLocalDateString(selectedDate),
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
        purpose: formData.purpose,
        notes: formData.notes,
        meetingMode: formData.meetingMode,
      });
      toast.success("Meeting scheduled successfully!");
      setFormData(initialForm);
      setErrors({});
      if (setSelectedSlot) setSelectedSlot(null);
      if (onBookingSuccess) onBookingSuccess();
    } catch (error) {
      const apiError = error?.response?.data?.message || "Something went wrong. Please try again.";
      setSubmitError(apiError);
      toast.error(apiError);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError("");
    if (!selectedSlot) {
      setSubmitError("Please select a time slot before booking.");
      return;
    }
    if (!validateForm()) return;
    requireAuth(submitBooking);
  };

  useEffect(() => {
    if (!user) return;
    setFormData((prev) => ({
      ...prev,
      name: user.name || "",
      company: user.company || "",
      email: user.email || "",
      phone: user.phone || "",
    }));
  }, [user]);

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate>
      <div className="meeting-section-title">
        <h3>Your Details</h3>
        <p>Fill in your information to schedule a meeting.</p>
      </div>

      <div className="selected-summary">
        <div>
          <span>Date</span>
          <strong>{selectedDate ? selectedDate.toLocaleDateString() : "Select Date"}</strong>
        </div>
        <div>
          <span>Time</span>
          <strong>
            {selectedSlot
              ? `${formatTime(selectedSlot.startTime)} - ${formatTime(selectedSlot.endTime)}`
              : "Select a slot"}
          </strong>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Full Name *</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Company</label>
          <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Acme Corp" />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="johndoe@example.com" required />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Phone *</label>
          <PhoneInputField
            value={formData.phone}
            onChange={(phone) => setFormData((prev) => ({ ...prev, phone }))}
            disabled={!!user?.phone}
            required
          />
          {errors.phone && <span className="form-error">{errors.phone}</span>}
        </div>
      </div>

      <div className="form-group">
        <label>Purpose of Meeting *</label>
        <textarea rows="4" name="purpose" value={formData.purpose} onChange={handleChange} placeholder="Briefly state the goal..." required />
        {errors.purpose && <span className="form-error">{errors.purpose}</span>}
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Meeting Mode</label>
          {/* Swapped standard HTML select with react-select */}
          <Select
            options={meetingModeOptions}
            value={meetingModeOptions.find(opt => opt.value === formData.meetingMode)}
            onChange={(selectedOption) => {
              setFormData(prev => ({ ...prev, meetingMode: selectedOption.value }));
            }}
            styles={customSelectStyles}
            isSearchable={false}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Additional Notes</label>
        <textarea rows="3" name="notes" value={formData.notes} onChange={handleChange} maxLength={500} placeholder="Any extra context..." />
        <div className="textarea-footer">
          <span></span>
          <span className="char-counter">{formData.notes.length}/500</span>
        </div>
      </div>

      {submitError && <div className="form-error submit-error-alert">{submitError}</div>}

      <button type="submit" className="book-btn" disabled={loading || !selectedSlot}>
        {loading ? "Booking..." : "Book Meeting"}
      </button>
    </form>
  );
}

export default BookingForm;