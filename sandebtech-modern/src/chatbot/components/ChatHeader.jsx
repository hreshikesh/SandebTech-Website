import { X, RotateCcw, Sparkles } from "lucide-react";

export default function ChatHeader({ onClose, onClear }) {
  return (
    <div className="chat-header">
      <div className="chat-header-info">
        <div className="avatar-badge">
          <Sparkles size={16} />
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