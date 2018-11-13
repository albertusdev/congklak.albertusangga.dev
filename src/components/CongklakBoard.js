import React, { useState } from "react";
import CongklakHole from "./CongklakHole";
import {
  generateCongklakInitialState,
  PLAYER1_SCORE_HOLE_NUMBER,
  PLAYER2_SCORE_HOLE_NUMBER,
  getPlayer2PlayableHoles,
  getPlayer1PlayableHoles,
  getPlayer1ScoreHole,
  getPlayer2ScoreHole
} from "../logic/congklakLogicUtils";
import { simulateCongklakRotation } from "../logic/coreLogic";

import "../App.css";

function CongklakBoard(props) {
  const [congklakState, setCongklakState] = useState(
    generateCongklakInitialState()
  );
  const [focusedCongklakHoleNumber, setFocusedCongklakHoleNumber] = useState(
    -1
  );
  const [turn, setTurn] = useState(1);
  const [
    displayNumberOfSeedsToBeDistributed,
    setDisplayNumberOfSeedsToBeDistributed
  ] = useState(-1);

  const handlePlayerClick = selectedHoleNumber => async () => {
    simulateCongklakRotation({
      congklakState,
      turn,
      selectedHoleNumber,

      setCongklakStateFn: setCongklakState,
      setFocusedCongklakHoleNumberFn: setFocusedCongklakHoleNumber,
      setDisplayNumberOfSeedsToBeDistributedFn: setDisplayNumberOfSeedsToBeDistributed,
      setTurnFn: setTurn,

      delay: props.delay
    });
  };

  if (!props.disabled) {
    return <div />;
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Current Turn: Player {turn}</h1>
      <div className="-board">
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "center",
            flex: 1
          }}
        >
          {getPlayer1PlayableHoles(congklakState).map((value, idx) => (
            <CongklakHole
              key={`congklak-hole-${idx - 1}`}
              focused={focusedCongklakHoleNumber === idx}
              value={value}
              disabled={
                displayNumberOfSeedsToBeDistributed !== -1 ||
                turn !== 1 ||
                value === 0
              }
              onClick={handlePlayerClick(idx)}
            />
          ))}
        </div>

        {/* Player 1 and 2 Score Holes */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flex: 1,
            margin: "0 -10%"
          }}
        >
          <CongklakHole
            key={`congklak-hole-0`}
            focused={focusedCongklakHoleNumber === PLAYER1_SCORE_HOLE_NUMBER}
            value={congklakState[PLAYER1_SCORE_HOLE_NUMBER]}
            disabled
          />
          {displayNumberOfSeedsToBeDistributed !== -1 && (
            <div
              className="inhand-counter"
              style={{ fontWeight: "bold", fontSize: "1.5rem" }}
            >
              {displayNumberOfSeedsToBeDistributed}
            </div>
          )}
          <CongklakHole
            key={`congklak-hole-8`}
            focused={focusedCongklakHoleNumber === PLAYER2_SCORE_HOLE_NUMBER}
            value={congklakState[PLAYER2_SCORE_HOLE_NUMBER]}
            disabled
          />
        </div>

        {/* Player 2 Holes */}
        <div style={{ display: "flex", justifyContent: "center", flex: 1 }}>
          {getPlayer2PlayableHoles(congklakState).map((value, idx) => (
            <CongklakHole
              key={`congklak-hole-${idx + 8}`}
              focused={focusedCongklakHoleNumber === idx + 8}
              value={value}
              disabled={
                displayNumberOfSeedsToBeDistributed !== -1 ||
                turn !== 2 ||
                value === 0
              }
              onClick={handlePlayerClick(idx + 8)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CongklakBoard;
