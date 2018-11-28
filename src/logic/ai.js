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

function utility(congklakState, turn) {
  return congklakState[getOwnScoreHoleNumber(turn)];
}

function evaluation(congklakState, turn) {
  return utility(congklakState, turn);
}

// Return the most optimum choice between hole number 8 - 14
function minimax(state, depthLimit = null) {
  let maximum = MINUS_INFINITY;
  let choice = null;
  let indexes = getPlayer2PlayableHoles(state);
  for (let i = 0; i < indexes.length; i += 1) {
    let holeNumber = indexes[i];
    let newState = getCongklakNextState(state, 2, holeNumber);
    let actionResult = getMin(newState, depthLimit);
    if (actionResult > maximum) {
      maximum = actionResult;
      choice = holeNumber;
    }
  }
  return choice;
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
