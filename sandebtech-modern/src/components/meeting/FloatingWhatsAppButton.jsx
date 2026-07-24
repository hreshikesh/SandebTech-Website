import "./FloatingWhatsAppButton.css";
import { FaWhatsapp } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";

function FloatingWhatsAppButton() {
  const { requireAuth } = useAuth();
  const whatsappNumber = "918049536469";

  const handleWhatsAppClick = () => {
    requireAuth(() => {
      const defaultMessage = encodeURIComponent(
        "Hello! I would like to inquire about SandebTech solutions."
      );
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;
      
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  };

  return (
    <button
      className="whatsapp-fab"
      onClick={handleWhatsAppClick}
      type="button"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={22} />
    </button>
  );
}

export default FloatingWhatsAppButton;