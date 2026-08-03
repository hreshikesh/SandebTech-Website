import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";

import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";

import "../styles/chatbot.css";

function ChatBot() {
  const [open, setOpen] = useState(false);

  // Close chat on Escape key press for accessibility
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape" && open) {
      setOpen(false);
    }
  }, [open]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="chatbot-wrapper">
      <ChatButton
        open={open}
        onClick={() => setOpen((prev) => !prev)}
      />

      <AnimatePresence>
        {open && (
          <ChatWindow onClose={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default ChatBot;