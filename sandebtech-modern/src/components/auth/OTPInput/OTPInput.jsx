import { useEffect, useRef } from "react";
import "./OTPInput.css";

function OTPInput({ value, onChange }) {
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (e, index) => {
    const digit = e.target.value.replace(/\D/g, "");

    if (!digit) {
      const updated = [...value];
      updated[index] = "";
      onChange(updated);
      return;
    }

    const updated = [...value];
    updated[index] = digit[0];
    onChange(updated);

    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      value[index] === "" &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const updated = [...value];

    pasted.split("").forEach((digit, i) => {
      updated[i] = digit;
    });

    onChange(updated);

    const next = Math.min(pasted.length, 5);

    inputRefs.current[next]?.focus();
  };

  return (
    <div
      className="otp-wrapper"
      onPaste={handlePaste}
    >
      {value.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="otp-box"
        />
      ))}
    </div>
  );
}

export default OTPInput;