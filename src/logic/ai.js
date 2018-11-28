import {
  PLAYER2_PLAYABLE_HOLE_NUMBERS,
  getOwnScoreHoleNumber,
  isPlayer2OutOfMove,
  isPlayer1OutOfMove,
  getPlayer2PlayableHoles
} from "../logic/congklakLogicUtils";
import { getCongklakNextState } from "./coreLogic";

const MINUS_INFINITY = -10000000;
const PLUS_INFINITY = +10000000;

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

function terminalTest(congklakState, turn) {
  if (turn === 1) {
    return isPlayer1OutOfMove(congklakState);
  } else {
    return isPlayer2OutOfMove(congklakState);
  }
}

function utility(congklakState) {
  return congklakState[getOwnScoreHoleNumber(congklakState)];
}

function evaluation(congklakState) {
  return utility(congklakState);
}

function minimax(state) {
  let maximum = MINUS_INFINITY;
  let indexes = getPlayer2PlayableHoles(state);
  for (let i = 0; i < indexes.length; i += 1) {
    let holeNumber = indexes[i];
    let newState = getCongklakNextState(congklakState, 2, holeNumber);
    maximum = Math.max(maximum, getMin(newState, null));
  }
  return maximum;
}

function getMin(
  state,
  depthLimit,
  alpha = MINUS_INFINITY,
  beta = PLUS_INFINITY
) {}

function getMax(
  state,
  depthLimit,
  alpha = MINUS_INFINITY,
  beta = PLUS_INFINITY
) {}
