const questions = [
  "What services do you offer?",
  "Tell me about Shipflow CFD",
  "How can I contact SandebTech?",
  "Book a meeting",
  "What are the solutions offerd by the company?"
];

export default function SuggestedQuestions({ onSelect }) {
  return (
    <div className="suggestions-container">
      <span className="suggestions-label">Suggested Topics</span>
      <div className="suggestions">
        {questions.map((question) => (
          <button
            key={question}
            type="button"
            className="suggestion-chip"
            onClick={() => onSelect(question)}
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}