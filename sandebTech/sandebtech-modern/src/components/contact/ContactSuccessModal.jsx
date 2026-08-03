import { Check, X } from "lucide-react";
import "./ContactSuccessModal.css";

function ContactSuccessModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="contact-modal-overlay" onClick={onClose}>
      <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close" 
          onClick={onClose} 
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Added a structural wrapper around the checkmark for a cleaner UI footprint */}
        <div className="success-icon-wrapper">
          <Check size={36} strokeWidth={3} className="success-icon" />
        </div>

        <h2>Message Sent!</h2>

        <p>
          Thank you for contacting <strong>SandebTech</strong>. Our engineering 
          team has received your inquiry and will get back to you within one business day.
        </p>

        <button onClick={onClose} className="success-btn">
          Continue Browsing
        </button>
      </div>
    </div>
  );
}

export default ContactSuccessModal;