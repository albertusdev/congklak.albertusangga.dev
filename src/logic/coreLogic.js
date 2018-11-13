import {
  getNextHoleNumber,
  getEnemyScoreHoleNumber,
  isInOwnArea,
  getNextTurn,
  getOwnScoreHoleNumber,
  PLAYER1_SCORE_HOLE_NUMBER,
  PLAYER2_SCORE_HOLE_NUMBER
} from "./congklakLogicUtils";

import { waitFor } from "../utils";

export async function simulateCongklakRotation({
  congklakState,
  turn,
  selectedHoleNumber,

  setCongklakStateFn,
  setFocusedCongklakHoleNumberFn,
  setDisplayNumberOfSeedsToBeDistributedFn,
  setTurnFn,

  delay
}) {
  function setCongklakStateHelper(holeNumber, value) {
    congklakState[holeNumber] = value;
    setCongklakStateFn(congklakState);
    setFocusedCongklakHoleNumberFn(holeNumber);
    return congklakState;
  }

  let seeds = congklakState[selectedHoleNumber];
  let currentHoleNumber = getNextHoleNumber(selectedHoleNumber);

  setDisplayNumberOfSeedsToBeDistributedFn(seeds);
  setCongklakStateHelper(selectedHoleNumber, 0);
  await waitFor(delay);

  while (seeds > 0) {
    if (currentHoleNumber === getEnemyScoreHoleNumber(turn)) {
      currentHoleNumber = getNextHoleNumber(currentHoleNumber);
      continue;
    }

    seeds -= 1;

    await waitFor(delay);

    if (
      seeds === 0 &&
      currentHoleNumber != PLAYER1_SCORE_HOLE_NUMBER &&
      currentHoleNumber != PLAYER2_SCORE_HOLE_NUMBER
    ) {
      if (congklakState[currentHoleNumber] > 0) {
        seeds += congklakState[currentHoleNumber];
        setCongklakStateHelper(currentHoleNumber, 0);
        setDisplayNumberOfSeedsToBeDistributedFn(seeds);
        await waitFor(delay);
      } else if (isInOwnArea(currentHoleNumber, turn)) {
        setFocusedCongklakHoleNumberFn(currentHoleNumber + 7);
        await waitFor(delay);
        const take = congklakState[currentHoleNumber + 7];
        setCongklakStateHelper(currentHoleNumber + 7, 0);
        await waitFor(delay);
        setFocusedCongklakHoleNumberFn(currentHoleNumber);
        await waitFor(delay);
        setCongklakStateHelper(currentHoleNumber, take);
      }
    }

    setDisplayNumberOfSeedsToBeDistributedFn(seeds);
    setFocusedCongklakHoleNumberFn(currentHoleNumber);
    setCongklakStateHelper(
      currentHoleNumber,
      congklakState[currentHoleNumber] + 1
    );
    await waitFor(delay);

    currentHoleNumber = getNextHoleNumber(currentHoleNumber);
  }

  setTurnFn(getNextTurn(turn));
  setDisplayNumberOfSeedsToBeDistributedFn(-1);
  setFocusedCongklakHoleNumberFn(-1);
}
