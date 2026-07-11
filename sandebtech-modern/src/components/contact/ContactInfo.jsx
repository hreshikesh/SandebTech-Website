import "./ContactInfo.css";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";

function ContactInfo() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);

    // Backend integration later
  };

  return (
    <section className="contact-section">

      <div className="container">

        <div className="contact-grid">

          {/* LEFT */}

          <div className="contact-details">

            <span className="section-badge">
              CONTACT
            </span>

            <h2>
              We'd Love to Hear From You
            </h2>

            <p>
              Whether you have a project inquiry, require engineering
              consultation, or would like to know more about our
              solutions, our team is ready to assist you.
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

          {/* RIGHT */}

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <h3>Send an Inquiry</h3>

            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />

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

            <textarea
              rows="6"
              placeholder="Tell us about your project..."
              name="message"
              value={form.message}
              onChange={handleChange}
              required
            />

            <button type="submit">

              Send Inquiry

              <ArrowRight size={18} />

            </button>

          </form>

        </div>

      </div>

    </section>
  );
}

export default ContactInfo;