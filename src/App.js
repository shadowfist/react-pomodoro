import React, { useState, useRef } from "react";
import alarmBeep from "./media/07070161.mp3";
import "./App.css";

function padTime(time) {
  return time.toString().padStart(2, "0");
}

export default function App() {
  const [title, setTitle] = useState("Let's Focus");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const myAudio = useRef();

  function startTimer() {
    if (intervalRef.current !== null) {
      return;
    }
    setTitle("You're doing great!");
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft > 0) {
          return timeLeft - 1;
        }
        myAudio.current.play();
        return 0;
      });
    }, 1000);
    setIsRunning(true);
  }

  function stopTimer() {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle("Keep going, you're almost there!");
    setIsRunning(false);
  }

  function resetTimer() {
    myAudio.current.pause();
    setTimeLeft(25 * 60);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle("Ready for another round?");
    setIsRunning(false);
  }

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      <audio id="alarmBeep" ref={myAudio} loop src={alarmBeep}></audio>
      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
