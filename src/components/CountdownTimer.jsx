import React, { useState, useEffect } from "react";

export default function CountdownTimer() {
  const [inputMinutes, setInputMinutes] = useState(""); // User enters time in minutes
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });  const [isRunning, setIsRunning] = useState(false);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setTimeLeft((prevTime) => {
          let { hours, minutes, seconds } = prevTime;

          if (hours === 0 && minutes === 0 && seconds === 0) {
            clearInterval(id);
            setIsRunning(false);
            submitQuiz(); // Auto-submit when timer reaches zero
            return prevTime;
          }

          if (seconds > 0) {
            seconds -= 1;
          } else if (minutes > 0) {
            minutes -= 1;
            seconds = 59;
          } else if (hours > 0) {
            hours -= 1;
            minutes = 59;
            seconds = 59;
          }

          return { hours, minutes, seconds };
        });
      }, 1000);

      setTimerId(id);
      return () => clearInterval(id);
    }
  }, [isRunning]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsRunning(false); // Pause the timer when tab is inactive
      } else {
        setIsRunning(true); // Resume the timer when tab is active
      }
    };

    const handleFocus = () => {
      setIsRunning(true); // Ensure it resumes when user switches back to the tab
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);
  const submitQuiz = () => {
    setIsRunning(false);
    if (timerId) clearInterval(timerId);
    alert("Time is up! Quiz submitted.");
  };

  return (
    <div className="font-[Satoshi] w-[320px] p-4 rounded-lg shadow-lg text-center bg-[#1d232a] flex flex-col items-center">
      {/* Countdown Display Container */}
      <div className="flex flex-row items-center justify-center space-x-2">
        {/* Hours */}
        <div className="flex flex-col items-center w-[80px]">
          <span className="countdown font-mono text-2xl bg-[#09090b] p-3 w-full rounded-lg text-white">
            {String(timeLeft.hours).padStart(2, "0")}
          </span>
          <span className="mt-2 text-white text-sm">hr</span>
        </div>

        <span className="text-white text-3xl">:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center w-[80px]">
          <span className="countdown font-mono text-2xl bg-[#09090b] p-3 w-full rounded-lg text-white">
            {String(timeLeft.minutes).padStart(2, "0")}
          </span>
          <span className="mt-2 text-white text-sm">min</span>
        </div>

        <span className="text-white text-3xl">:</span>

        {/* Seconds */}
        <div className="flex flex-col items-center w-[80px]">
          <span className="countdown font-mono text-2xl bg-[#09090b] p-3 w-full rounded-lg text-white">
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
          <span className="mt-2 text-white text-sm">sec</span>
        </div>
      </div>
    </div>
  );
}
