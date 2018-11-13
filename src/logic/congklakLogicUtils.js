export const PLAYER1_SCORE_HOLE_NUMBER = 7;
export const PLAYER2_SCORE_HOLE_NUMBER = 15;

export const isInOwnArea = (holeNumber, turn) =>
  holeNumber >= (turn - 1) * 8 && holeNumber < turn * 8 - 1;

export const getNextHoleNumber = holeNumber => (holeNumber + 1) % 16;
export const generateCongklakInitialState = () => {
  return [7, 7, 7, 7, 7, 7, 7, 0, 7, 7, 7, 7, 7, 7, 7, 0];
};

export const getPlayer1PlayableHoles = congklakState =>
  congklakState.filter((_, i) => i >= 0 && i < 7);
export const getPlayer2PlayableHoles = congklakState =>
  congklakState.filter((_, i) => i >= 8 && i < 15);

export const getNextTurn = currentTurn => (currentTurn % 2) + 1;
export const getOwnScoreHoleNumber = currentTurn => currentTurn * 8 - 1;
export const getEnemyScoreHoleNumber = currentTurn =>
  getNextTurn(currentTurn) * 8 - 1;

export const isScoreHole = holeNumber =>
  holeNumber === PLAYER1_SCORE_HOLE_NUMBER ||
  holeNumber === PLAYER2_SCORE_HOLE_NUMBER;
