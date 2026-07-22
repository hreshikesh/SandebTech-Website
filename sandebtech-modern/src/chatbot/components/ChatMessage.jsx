
export default function ChatMessage({ sender, text, timestamp }) {
  const isUser = sender === "user";

  return (
    <div className={`chat-message ${isUser ? "user" : "bot"}`}>
      <div className="message-bubble">
        <p className="message-text">{text}</p>
        {timestamp && <span className="message-time">{timestamp}</span>}
      </div>
    </div>
  );
}