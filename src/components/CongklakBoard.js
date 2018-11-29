import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CongklakHole from "./CongklakHole";
import {
  generateCongklakInitialState,
  PLAYER1_SCORE_HOLE_NUMBER,
  PLAYER2_SCORE_HOLE_NUMBER,
  getPlayer2PlayableHoles,
  getPlayer1PlayableHoles,
  isGameOver,
  isPlayer1OutOfMove,
  isPlayer2OutOfMove,
  getEndOfGameMessage
} from "../logic/congklakLogicUtils";
import { simulateCongklakRotation } from "../logic/coreLogic";
import { waitFor } from "../utils";
import { getChoice } from "../logic/ai";
import Spinner from "react-spinkit";

import axios from "axios";
import { DASHBOARD_URL } from "../urls";
import { MAP_DIFFICULTY_NUMBER_TO_DIFFICULTY } from "../logic/congklakDifficulty";

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

  const isAiThinking = () =>
    turn === 2 &&
    (focusedCongklakHoleNumber === -1 ||
      displayNumberOfSeedsToBeDistributed === -1);
  // const isAiThinking = () => true;

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
      setTurn(2);
      nextTurn = 2;
    }
    while (nextTurn === 2) {
      if (isPlayer2OutOfMove(nextState)) {
        setTurn(1);
        break;
      }

      let selectedHoleNumber = await getChoice(nextState, props.difficulty);

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
        await waitFor(2 * delay);
        setTurn(2);
        nextTurn = 2;
      }
    }
    setTurn(1);

    if (isGameOver(congklakState)) {
      const result = await axios.post(DASHBOARD_URL, {
        name: props.name,
        difficulty: MAP_DIFFICULTY_NUMBER_TO_DIFFICULTY[props.difficulty],
        score: congklakState[PLAYER1_SCORE_HOLE_NUMBER]
      });
      console.log(result);
    }
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
        <React.Fragment>
          <h5 style={{ margin: "0.25rem 0", display: "flex" }}>
            <span>Current Turn:</span>
            <span
              style={{
                marginLeft: "1rem",
                color: "#795548",
                fontWeight: "bold"
              }}
            >
              {turn === 1 ? props.name : "Congklak.AI"}
            </span>
          </h5>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              transition: "0.5s",
              visibility: isAiThinking() ? "visible" : "hidden"
            }}
          >
            <span style={{ marginBottom: "0.5rem" }}>
              Congklak.AI is thinking...
            </span>
            <Spinner name="pacman" color="#795548" fadeIn="none" />
          </div>
        </React.Fragment>
      )}

      <div
        className="congklak-board"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {/* Player 2 Holes */}
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "center",
            flex: 1
          }}
        >
          {getPlayer2PlayableHoles(congklakState).map((value, idx) => (
            <CongklakHole
              className="CongklakHole-player2"
              key={`congklak-hole-${idx + 8}`}
              focused={focusedCongklakHoleNumber === idx + 8}
              value={value}
              disabled
              onClick={handlePlayerClick(idx + 8)}
              delay={props.delay}
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
            className="CongklakHole-score2"
            key={`congklak-hole-8`}
            focused={focusedCongklakHoleNumber === PLAYER2_SCORE_HOLE_NUMBER}
            value={congklakState[PLAYER2_SCORE_HOLE_NUMBER]}
            disabled
            delay={props.delay}
          />
          {displayNumberOfSeedsToBeDistributed !== -1 && (
            <div className="inhand-counter">
              {displayNumberOfSeedsToBeDistributed}
            </div>
          )}
          <CongklakHole
            className="CongklakHole-score1"
            key={`congklak-hole-0`}
            focused={focusedCongklakHoleNumber === PLAYER1_SCORE_HOLE_NUMBER}
            value={congklakState[PLAYER1_SCORE_HOLE_NUMBER]}
            disabled
            delay={props.delay}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
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
              delay={props.delay}
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
  disabled: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired
};

export default CongklakBoard;
