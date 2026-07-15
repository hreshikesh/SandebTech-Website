import "./BookingForm.css";
import { useState, useEffect } from "react";
import { bookMeeting } from "../../service/meetingApi";
import PhoneInputField from "../auth/PhoneInputField";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useAuth } from "../../context/AuthContext";


function BookingForm({ selectedDate, selectedSlot }) {
    const { user } = useAuth();
    const initialForm = {
        name: "",
        company: "",
        email: "",
        phone: "",
        purpose: "",
        meetingMode: "Google Meet",
        duration: "30 Minutes",
        notes: "",
    };

    const [formData, setFormData] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const { requireAuth } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;

        // 1. Name Input: Strip out numbers completely in real-time
        if (name === "name") {
            const cleanName = value.replace(/[0-9]/g, "");
            setFormData((prev) => ({ ...prev, [name]: cleanName }));
            return;
        }

        // Standard fallback for other fields
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        // Name Validation
        if (!formData.name.trim()) {
            newErrors.name = "Full name is required.";
        }

        // Email Validation
        if (!formData.email.trim()) {
            newErrors.email = "Email address is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        // Phone Validation (Matches ContactInfo criteria safely)
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

        // Purpose Validation
        if (!formData.purpose.trim()) {
            newErrors.purpose = "Purpose of the meeting is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Aligned Sub-routine Action mirroring ContactInfo execution strategy
    const submitBooking = async () => {
        setLoading(true);

        try {
            bookMeeting({

                meetingDate: selectedDate,

                startTime: selectedSlot.startTime,

                endTime: selectedSlot.endTime,

                purpose: formData.purpose,

                meetingMode: formData.meetingMode,

                notes: formData.notes,

            });

            if (response.success) {
                alert(response.message || "Meeting booked successfully!");
                setFormData(initialForm);
                setErrors({});
            } else {
                setSubmitError(response.message || "Failed to book meeting.");
            }
        } catch (error) {
            console.error("Failed to book meeting:", error);
            setSubmitError("Something went wrong. Please try again.");
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

        setFormData(prev => ({

            ...prev,

            name: user.name || "",

            company: user.company || "",

            email: user.email || "",

            phone: user.phone || "",

        }));

    }, [user]);

    return (
        <form className="booking-form" onSubmit={handleSubmit}>
            <div className="meeting-section-title">
                <h3>Your Details</h3>
                <p>Fill in your information to schedule a meeting.</p>
            </div>

            <div className="selected-summary">
                <div>
                    <span>Date</span>
                    <strong>
                        {selectedDate ? selectedDate.toLocaleDateString() : "Select Date"}
                    </strong>
                </div>
                <div>
                    <span>Time</span>
                    <strong>{selectedSlot || "Select a slot"}</strong>
                </div>
            </div>

            <div className="form-grid">
                <div className="form-group">
                    <label>Full Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!!user}
                        required
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label>Company</label>
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Email *</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!!user}
                        required
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label>Phone *</label>
                    <PhoneInputField
                        value={formData.phone}
                        onChange={(phone) =>
                            setFormData((prev) => ({
                                ...prev,
                                phone,
                            }))
                        }
                        disabled={!!user}
                        required
                    />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>
            </div>

            <div className="form-group">
                <label>Purpose of Meeting *</label>
                <textarea
                    rows="4"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    required
                />
                {errors.purpose && <span className="form-error">{errors.purpose}</span>}
            </div>

            <div className="form-grid">
                <div className="form-group">
                    <label>Meeting Mode</label>
                    <select
                        name="meetingMode"
                        value={formData.meetingMode}
                        onChange={handleChange}
                    >
                        <option value="GOOGLE_MEET">
                            Google Meet
                        </option>

                        <option value="IN_PERSON">
                            In Person
                        </option>

                        <option value="PHONE_CALL">
                            Phone Call
                        </option>
                    </select>
                </div>

               
            </div>

            <div className="form-group">
                <label>Additional Notes</label>
                <textarea
                    rows="3"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                />
            </div>

            {submitError && (
                <div className="form-error submit-error" style={{ marginBottom: "15px" }}>
                    {submitError}
                </div>
            )}
            <button
                type="submit"
                className="book-btn"
                disabled={loading || !selectedSlot}
            >
                {loading ? "Booking..." : "Book Meeting"}
            </button>
        </form>
    );
}

export default BookingForm;