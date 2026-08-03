import { useState } from "react";
import { SendHorizontal } from "lucide-react";

export default function ChatInput({ sendMessage, disabled }) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    sendMessage(value);
    setValue("");
  };

  return (
    <div className="chat-input-wrapper">
      <div className="chat-input-container">
        <input
          type="text"
          value={value}
          placeholder="Ask Sandeb AI..."
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
          disabled={disabled}
          aria-label="Type your message"
        />

        <button
          type="button"
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          aria-label="Send message"
          className="send-button"
        >
          <SendHorizontal size={18} />
        </button>
      </div>
    </div>
  );
}