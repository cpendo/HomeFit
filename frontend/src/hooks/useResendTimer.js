import { useEffect, useState } from "react";

export const useResendTimer = (initialSeconds = 180) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [resendAvailable, setResendAvailable] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      setResendAvailable(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const resetTimer = () => {
    setTimeLeft(initialSeconds);
    setResendAvailable(false);
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return {
    timeLeft,
    resendAvailable,
    formatTime,
    resetTimer,
  };
};
