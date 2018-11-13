import React, { useState } from "react";
import CongklakHole from "./CongklakHole";
import {
  getNextHoleNumber,
  waitFor,
  generateCongklakInitialState,
  isInOwnArea
} from "./utils";

function CongklakBoard(props) {
  const [congklakState, setCongklakState] = useState([
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    0,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    0
  ]);

  const [focusedCongklakHoleNumber, setFocusedCongklakHoleNumber] = useState(
    -1
  );

  const [turn, setTurn] = useState(1);
  const [seedsToBeDistributed, setSeedsToBeDistributed] = useState(-1);

  const enemyTurn = (turn % 2) + 1;

  const ownHoleNumber = turn * 8 - 1;
  const enemyHoleNumber = enemyTurn * 8 - 1;

  const player1PlayableHoles = congklakState.filter((_, i) => i >= 0 && i < 7);
  const player1ScoreHole = congklakState[7];
  const player2PlayableHoles = congklakState.filter((_, i) => i >= 8 && i < 15);
  const player2ScoreHole = congklakState[15];

  const updateCongklakState = async (holeNumber, newValue) => {
    // const newCongklakState = [
    //   ...congklakState.slice(0, holeNumber),
    //   newValue,
    //   ...congklakState.slice(holeNumber + 1)
    // ];
    congklakState[holeNumber] = newValue;
    await setCongklakState(congklakState);
    await setFocusedCongklakHoleNumber(holeNumber);
    return congklakState;
  };

  const handlePlayerClick = holeNumber => async () => {
    let seeds = congklakState[holeNumber];
    let cur = getNextHoleNumber(holeNumber);

    setSeedsToBeDistributed(seeds);
    await updateCongklakState(holeNumber, 0);
    await waitFor(1000);

    while (seeds > 0) {
      if (cur === enemyHoleNumber) {
        cur = getNextHoleNumber(cur);
        continue;
      }
      --seeds;
      setSeedsToBeDistributed(seeds);
      await updateCongklakState(cur, congklakState[cur] + 1);
      await waitFor(500);

      if (seeds === 0 && congklakState[cur] > 0 && !isInOwnArea(cur, turn)) {
        seeds += congklakState[cur];
        await updateCongklakState(cur, 0);
        setSeedsToBeDistributed(seeds);
        await waitFor(500);
      }

      cur = getNextHoleNumber(cur);
    }

    setTurn(enemyTurn);
    setSeedsToBeDistributed(-1);
    setFocusedCongklakHoleNumber(-1);
  };

  //   if (!props.disabled) {
  //     return <div />;
  //   }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Current Turn: Player {turn}</h1>
      <div class={"congklak-board"}>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "center",
            flex: 1
          }}
        >
          {player1PlayableHoles.map((value, idx) => (
            <CongklakHole
              focused={focusedCongklakHoleNumber === idx}
              value={value}
              disabled={
                seedsToBeDistributed !== -1 || turn !== 1 || value === 0
              }
              onClick={handlePlayerClick(idx)}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flex: 1,
            margin: "0 -10%"
          }}
        >
          <CongklakHole
            focused={focusedCongklakHoleNumber === 7}
            value={player1ScoreHole}
            disabled={seedsToBeDistributed !== -1 || turn !== 1}
          />
          {seedsToBeDistributed !== -1 && (
            <div class={"inhand-counter"}>{seedsToBeDistributed}</div>
          )}
          <CongklakHole
            focused={focusedCongklakHoleNumber === 15}
            value={player2ScoreHole}
            disabled={seedsToBeDistributed !== -1 || turn !== 2}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center", flex: 1 }}>
          {player2PlayableHoles.map((value, idx) => (
            <CongklakHole
              focused={focusedCongklakHoleNumber === idx + 8}
              value={value}
              disabled={
                seedsToBeDistributed !== -1 || turn !== 2 || value === 0
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
