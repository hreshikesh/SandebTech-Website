import { X, RotateCcw } from "lucide-react";
import logo from "../../assets/images/logo/logo.webp";
export default function ChatHeader({ onClose, onClear }) {
  return (
    <div className="chat-header">
      <div className="chat-header-info">
        <div className="avatar-badge">
          <img src={logo} alt="Logo"/>
          <span className="status-indicator" title="Online" />
        </div>
        <div>
          <h3>Sandeb AI</h3>
          <span className="subtitle">Engineering Assistant</span>
        </div>
      </div>

      <div className="chat-header-actions">
        <button
          onClick={onClear}
          className="chat-header-btn"
          title="Clear Conversation"
          aria-label="Clear Conversation"
        >
          <RotateCcw size={16} />
        </button>

        <button
          onClick={onClose}
          className="chat-header-btn"
          title="Close Chat"
          aria-label="Close Chat Window"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}