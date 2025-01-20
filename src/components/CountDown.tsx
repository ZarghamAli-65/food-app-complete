// WITH A LIBRARY
"use client";
import React from "react";
import { useState, useEffect } from "react";
import Countdown from "react-countdown";
import { CountdownRendererFn } from "react-countdown";

const endingDate = new Date("2025-01-18");

const renderer: CountdownRendererFn = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}) => {
  if (completed) {
    // Render when the countdown is complete
    return <span className="text-green-500">Time's up!</span>;
  } else {
    // Render the countdown
    return (
      <span className="font-bold text-5xl text-yellow-300">
        {days}d {hours}h {minutes}m {seconds}s
      </span>
    );
  }
};
const CountDown: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensure this only runs on the client
  }, []);

  if (!mounted) return null; // Avoid rendering during the SSR/hydration phase

  return (
    <Countdown
      className="font-bold text-5xl text-yellow-300"
      date={endingDate}
      renderer={renderer}
    />
  );
};

export default CountDown;
