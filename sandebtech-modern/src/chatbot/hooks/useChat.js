import { useState, useCallback, useEffect } from "react";
import { sendChat } from "../service/chatbotApi";

const STORAGE_KEY = "sandeb-chat";
const LAST_ACTIVE_KEY = "sandeb-last-active";
const EXPIRY_MS = 3600000; // Updated to 1 hour (60 mins * 60 secs * 1000 ms)

const makeTimestamp = () =>
  new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const defaultMessages = [
  {
    id: "welcome",
    sender: "bot",
    text: "Hello! I'm Sandeb AI. How can I help you today?",
    timestamp: makeTimestamp(),
  },
];

/**
 * Reads saved chat from localStorage, but discards it
 * if last activity was more than 1 hour ago.
 */
function getInitialMessages() {
  try {
    const last = localStorage.getItem(LAST_ACTIVE_KEY);

    if (last) {
      const diff = Date.now() - Number(last);
      if (diff > EXPIRY_MS) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(LAST_ACTIVE_KEY);
        return defaultMessages;
      }
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultMessages;
  } catch (e) {
    console.error("Failed to read saved chat:", e);
    return defaultMessages;
  }
}

export default function useChat() {
  const [messages, setMessages] = useState(getInitialMessages);
  const [loading, setLoading] = useState(false);

  const clearChat = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LAST_ACTIVE_KEY);
    setMessages(defaultMessages);
  }, []);

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: trimmed,
      timestamp: makeTimestamp(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await sendChat(trimmed);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: response.answer,
          button: response.button,
          timestamp: makeTimestamp(),
        },
      ]);
    } catch (e) {
      console.error("sendChat failed:", e);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          sender: "bot",
          text: "Something went wrong.",
          timestamp: makeTimestamp(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

 
  useEffect(() => {
    const checkExpiry = () => {
      const last = localStorage.getItem(LAST_ACTIVE_KEY);
      if (last) {
        const diff = Date.now() - Number(last);
        if (diff > EXPIRY_MS) {
          clearChat();
        }
      }
    };


    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkExpiry();
      }
    };

    // Check periodically every 1 minute
    const interval = setInterval(checkExpiry, 60000);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [clearChat]);

  // Persist state to localStorage on updates
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    localStorage.setItem(LAST_ACTIVE_KEY, String(Date.now()));
  }, [messages]);

  return {
    messages,
    loading,
    sendMessage,
    clearChat,
  };
}