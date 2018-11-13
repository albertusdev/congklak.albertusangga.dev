import React, { useState, useEffect } from "react";
import "./App.css";
import CongklakBoard from "./components/CongklakBoard";

export default function App(props) {
  const [userName, setUserName] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [delay, setDelay] = useState(250);

  useEffect(() => {
    document.title = "Congklak.AI";
  });

  function handleClickStartButton() {
    setIsGameStarted(!isGameStarted);
  }

  function handleSetDelay(e) {
    setDelay(e.target.value);
  }

  return (
    <div className="App">
      <h1>Congklak.AI</h1>
      {isGameStarted && <input value={delay} onChange={handleSetDelay} />}
      <CongklakBoard disabled={isGameStarted} delay={delay} />
      <button className="start-button" onClick={handleClickStartButton}>
        {isGameStarted ? "Stop" : "Start"}
      </button>
    </div>
  );
}
