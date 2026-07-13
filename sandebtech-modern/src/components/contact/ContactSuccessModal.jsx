import { Check, X } from "lucide-react";
import "./ContactSuccessModal.css";

function ContactSuccessModal({
  open,
  onClose,
}) {

  if (!open) return null;

  return (

    <div
      className="contact-modal-overlay"
      onClick={onClose}
    >

      <div
        className="contact-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          className="modal-close"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        <Check
          size={70}
          className="success-icon"
        />

        <h2>
          Message Sent Successfully
        </h2>

        <p>

          Thank you for contacting
          <strong> SandebTech</strong>.

          <br /><br />

          Our engineering team has
          received your inquiry and
          will get back to you within
          one business day.

        </p>

        <button
          onClick={onClose}
          className="success-btn"
        >

          Continue Browsing

        </button>

      </div>

    </div>

  );

}

export default ContactSuccessModal;