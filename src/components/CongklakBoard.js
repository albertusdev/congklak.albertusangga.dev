import React, { useState, useEffect } from "react";
import CongklakHole from "./CongklakHole";
import {
  generateCongklakInitialState,
  PLAYER1_SCORE_HOLE_NUMBER,
  PLAYER2_SCORE_HOLE_NUMBER,
  getNextTurn,
  getPlayer2PlayableHoles,
  getPlayer1PlayableHoles,
  isGameOver,
  PLAYER2_PLAYABLE_HOLE_NUMBERS,
  isPlayer1OutOfMove,
  isPlayer2OutOfMove
} from "../logic/congklakLogicUtils";
import { simulateCongklakRotation } from "../logic/coreLogic";

import { getChoice } from "../logic/ai";

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
  const [shouldCallAi, setShouldCallAi] = useState(true);

  const handlePlayerClick = (selectedHoleNumber, delay = props.delay) => () => {
    simulateCongklakRotation({
      congklakState,
      turn,
      selectedHoleNumber,

      setCongklakStateFn: setCongklakState,
      setFocusedCongklakHoleNumberFn: setFocusedCongklakHoleNumber,
      setDisplayNumberOfSeedsToBeDistributedFn: setDisplayNumberOfSeedsToBeDistributed,
      setTurnFn: setTurn,

      delay
    });
  };

  useEffect(() => {
    if (turn === 1) {
      if (isPlayer1OutOfMove(congklakState)) {
        setTurn(getNextTurn(turn));
      }
    } else if (turn === 2) {
      if (isPlayer2OutOfMove(congklakState)) {
        setTurn(getNextTurn(turn));
      } else if (shouldCallAi) {
        setShouldCallAi(false);

        const selectedHoleNumber = getChoice(congklakState, null);

        simulateCongklakRotation({
          congklakState,
          turn,
          selectedHoleNumber,
          setCongklakStateFn: setCongklakState,
          setFocusedCongklakHoleNumberFn: setFocusedCongklakHoleNumber,
          setDisplayNumberOfSeedsToBeDistributedFn: setDisplayNumberOfSeedsToBeDistributed,
          setTurnFn: setTurn,
          delay: props.delay
        }).then(() => {
          setShouldCallAi(true);
        });
      }
    }
  });

  if (!props.disabled) {
    return <div />;
  }
  return (
    <div>
      {focusedCongklakHoleNumber === -1 && isGameOver(congklakState) && (
        <h1>Game Over!</h1>
      )}
      {!isGameOver(congklakState) && (
        <h1>Current Turn: {turn === 1 ? "Player" : "AI"}</h1>
      )}
      <div
        className="congklak-board"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div
          className="CongklakHole-player1"
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
            className="CongklakHole-score1"
            key={`congklak-hole-0`}
            focused={focusedCongklakHoleNumber === PLAYER1_SCORE_HOLE_NUMBER}
            value={congklakState[PLAYER1_SCORE_HOLE_NUMBER]}
            disabled
          />
          {displayNumberOfSeedsToBeDistributed !== -1 && (
            <div>{displayNumberOfSeedsToBeDistributed}</div>
          )}
          <CongklakHole
            className="CongklakHole-score2"
            key={`congklak-hole-8`}
            focused={focusedCongklakHoleNumber === PLAYER2_SCORE_HOLE_NUMBER}
            value={congklakState[PLAYER2_SCORE_HOLE_NUMBER]}
            disabled
          />
        </div>

        {/* Player 2 Holes */}
        <div
          className="CongklakHole-player2"
          style={{ display: "flex", justifyContent: "center", flex: 1 }}
        >
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
