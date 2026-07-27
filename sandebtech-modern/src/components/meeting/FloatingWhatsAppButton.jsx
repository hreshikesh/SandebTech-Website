import "./FloatingWhatsAppButton.css";
import { FaWhatsapp } from "react-icons/fa6";


function FloatingWhatsAppButton() {

  const whatsappNumber = "9108994209";

  const handleWhatsAppClick = () => {
    
      const defaultMessage = encodeURIComponent(
        "Hello! I would like to inquire about SandebTech solutions."
      );
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;
      
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    
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