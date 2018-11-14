import {
  getNextHoleNumber,
  getEnemyScoreHoleNumber,
  isInOwnArea,
  getNextTurn,
  getOwnScoreHoleNumber,
  PLAYER1_SCORE_HOLE_NUMBER,
  PLAYER2_SCORE_HOLE_NUMBER,
  getOppositeHoleNumber
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
    setCongklakStateHelper(
      currentHoleNumber,
      congklakState[currentHoleNumber] + 1
    );
    setFocusedCongklakHoleNumberFn(currentHoleNumber);
    setDisplayNumberOfSeedsToBeDistributedFn(seeds);

    await waitFor(delay);

    if (
      seeds === 0 &&
      currentHoleNumber !== PLAYER1_SCORE_HOLE_NUMBER &&
      currentHoleNumber !== PLAYER2_SCORE_HOLE_NUMBER
    ) {
      if (congklakState[currentHoleNumber] > 1) {
        seeds += congklakState[currentHoleNumber];
        setCongklakStateHelper(currentHoleNumber, 0);
        setDisplayNumberOfSeedsToBeDistributedFn(seeds);
        await waitFor(delay);
      } else if (isInOwnArea(currentHoleNumber, turn)) {
        const opposite = getOppositeHoleNumber(currentHoleNumber);
        const take = congklakState[opposite];
        setFocusedCongklakHoleNumberFn(opposite);
        setCongklakStateHelper(opposite, 0);
        await waitFor(delay);

        setCongklakStateHelper(getOwnScoreHoleNumber(turn), take);
      }
    }

    currentHoleNumber = getNextHoleNumber(currentHoleNumber);
  }

  setDisplayNumberOfSeedsToBeDistributedFn(-1);
  setFocusedCongklakHoleNumberFn(-1);
  if (currentHoleNumber !== getNextHoleNumber(getOwnScoreHoleNumber(turn))) {
    setTurnFn(getNextTurn(turn));
  }
}
