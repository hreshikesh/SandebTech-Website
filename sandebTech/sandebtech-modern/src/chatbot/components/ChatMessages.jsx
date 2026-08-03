import { useEffect, useRef, Fragment } from "react";
import { useNavigate } from "react-router-dom";

import ChatMessage from "./ChatMessage";
import SuggestedQuestions from "./SuggestedQuestions";
import TypingIndicator from "./TypingIndicator";

import useAuth from "../../hooks/useAuth";

export default function ChatMessages({
  messages,
  loading,
  sendMessage,
}) {
  const bottomRef = useRef(null);

  const navigate = useNavigate();
  const { requireAuth } = useAuth();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const showSuggestions =
    messages.length <= 1 && !loading;

  const handleAction = (button) => {
    if (
      button.url === "/meeting" ||
      button.url === "/contact"
    ) {
      requireAuth(() => {
        navigate(button.url);
      });

      return;
    }

    navigate(button.url);
  };

  return (
    <div className="chat-messages">
      {messages.map((message) => (
        <Fragment key={message.id}>
          <ChatMessage
            sender={message.sender}
            text={message.text}
            timestamp={message.timestamp}
          />

          {message.button && (
            <button
              className="chat-action-btn"
              onClick={() => handleAction(message.button)}
            >
              {message.button.label}
            </button>
          )}
        </Fragment>
      ))}

      {loading && <TypingIndicator />}

      {showSuggestions && (
        <SuggestedQuestions onSelect={sendMessage} />
      )}

      <div ref={bottomRef} />
    </div>
  );
}