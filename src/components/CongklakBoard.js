import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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
  isPlayer2OutOfMove,
  getEndOfGameMessage
} from "../logic/congklakLogicUtils";
import { simulateCongklakRotation } from "../logic/coreLogic";
import { waitFor } from "../utils";
import { getChoice } from "../logic/ai";
import Spinner from "react-spinkit";

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
  const [isAiThinking, setIsAiThinking] = useState(false);

  const handlePlayerClick = (
    selectedHoleNumber,
    delay = props.delay
  ) => async () => {
    let { nextState, nextTurn } = await simulateCongklakRotation({
      congklakState,
      turn,
      selectedHoleNumber,

      setCongklakStateFn: setCongklakState,
      setFocusedCongklakHoleNumberFn: setFocusedCongklakHoleNumber,
      setDisplayNumberOfSeedsToBeDistributedFn: setDisplayNumberOfSeedsToBeDistributed,
      setTurnFn: setTurn,

      delay
    });
    if (nextTurn === 1 && isPlayer1OutOfMove(nextState)) {
      setTurn(getNextTurn(nextTurn));
      nextTurn = 2;
    }
    while (nextTurn === 2) {
      if (isPlayer2OutOfMove(nextState)) {
        setTurn(1);
        break;
      }

      setIsAiThinking(true);
      let selectedHoleNumber = await getChoice(nextState, props.difficulty);
      setIsAiThinking(false);

      console.log(`Current State: `, nextState);
      console.log(`AI choose ${selectedHoleNumber}`);

      let result = await simulateCongklakRotation({
        congklakState: nextState,
        turn: nextTurn,
        selectedHoleNumber,
        setCongklakStateFn: setCongklakState,
        setFocusedCongklakHoleNumberFn: setFocusedCongklakHoleNumber,
        setDisplayNumberOfSeedsToBeDistributedFn: setDisplayNumberOfSeedsToBeDistributed,
        setTurnFn: setTurn,
        delay: props.delay
      });

      nextState = result.nextState;
      nextTurn = result.nextTurn;
      if (nextTurn === 1 && isPlayer1OutOfMove(nextState)) {
        setTurn(1);
        await waitFor(delay);
        setTurn(2);
        nextTurn = 2;
      }
    }
    setTurn(1);
  };

  if (!props.disabled) {
    return <React.Fragment />;
  }
  return (
    <React.Fragment>
      {focusedCongklakHoleNumber === -1 && isGameOver(congklakState) && (
        <React.Fragment>
          <h2 style={{ marginBottom: "0" }}>Game Over!</h2>
          <h3 style={{ fontStyle: "bold" }}>
            {getEndOfGameMessage(congklakState)}
          </h3>
          <button
            className="btn brown-light-3"
            onClick={() => {
              setCongklakState(generateCongklakInitialState());
              setTurn(1);
            }}
            style={{ marginBottom: "1.5rem" }}
          >
            Start Over
          </button>
        </React.Fragment>
      )}

      {!isGameOver(congklakState) && (
        <h3>Current Turn: {turn === 1 ? "Player" : "AI"}</h3>
      )}

      {!!isAiThinking && <h1>Ai is thinking...</h1>}

      <div
        className="congklak-board"
        style={{ display: "flex", flexDirection: "column" }}
      >
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
              className="CongklakHole-player1"
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
            <div className="inhand-counter">
              {displayNumberOfSeedsToBeDistributed}
            </div>
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
        <div style={{ display: "flex", justifyContent: "center", flex: 1 }}>
          {getPlayer2PlayableHoles(congklakState).map((value, idx) => (
            <CongklakHole
              className="CongklakHole-player2"
              key={`congklak-hole-${idx + 8}`}
              focused={focusedCongklakHoleNumber === idx + 8}
              value={value}
              disabled
              onClick={handlePlayerClick(idx + 8)}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

CongklakBoard.propTypes = {
  difficulty: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default CongklakBoard;
