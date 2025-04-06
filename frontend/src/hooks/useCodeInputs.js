import { useRef, useState, useEffect } from "react";

export const useCodeInputs = (length = 6) => {
  const [values, setValues] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updated = [...values];
    updated[index] = value;
    setValues(updated);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!values[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const isComplete = values.every((val) => val !== "");

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return {
    values,
    isComplete,
    handleChange,
    handleKeyDown,
    inputRefs,
  };
};
