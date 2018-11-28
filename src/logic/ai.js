import { PLAYER2_PLAYABLE_HOLE_NUMBERS } from "../logic/congklakLogicUtils";

export function getChoice(congklakState, difficulty) {
  return getRandomChoice(congklakState);
  //   if (difficulty === 0) {
  //     return getEasyAiChoice(congklakState);
  //   } else {
  //     return minimax(congklakState);
  //   }
}

// Dumb AI: Random pick available move
function getRandomChoice(congklakState) {
  const playableHoles = PLAYER2_PLAYABLE_HOLE_NUMBERS.filter(
    val => congklakState[val] > 0
  );
  return playableHoles[Math.floor(Math.random() * playableHoles.length)];
}

function minimax(state) {}

function getMin(state, alpha, beta, depthLimit) {}

function getMax(state, alpha, beta, depthLimit) {}
