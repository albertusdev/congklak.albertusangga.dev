import React, { useState, useEffect } from "react";
import "./App.css";
import CongklakBoard from "./CongklakBoard";

export default function App(props) {
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    document.title = "Congklak.AI";
  });

  function handleClickStartButton() {
    setIsGameStarted(!isGameStarted);
  }

  return (
    <div className="App">
      <h1>Congklak.AI</h1>
      <CongklakBoard disabled={isGameStarted} />
      <button className="start-button" onClick={handleClickStartButton}>
        {isGameStarted ? "Stop" : "Start"}
      </button>
    </div>
  );
}
