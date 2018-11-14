import {
  isGameOver,
  isPlayer1OutOfMove,
  isPlayer2OutOfMove,
  getPlayer1PlayableHoles,
  getPlayer2PlayableHoles,
  getOwnScoreHoleNumber,
  getNextTurn,
  PLAYER1_SCORE_HOLE_NUMBER,
  PLAYER2_SCORE_HOLE_NUMBER,
  getEnemyScoreHoleNumber,
  isScoreHole
} from "./congklakLogicUtils";
import {
  generateCongklakInitialState,
  getNextHoleNumber,
  isInOwnArea
} from "../utils";

it("tests isGameOver()", () => {
  expect(isGameOver([0, 0, 0, 0, 0, 0, 0, 49, 0, 0, 0, 0, 0, 0, 0, 49])).toBe(
    true
  );
  expect(isGameOver([1, 0, 0, 0, 0, 0, 0, 49, 0, 0, 0, 0, 0, 0, 0, 49])).toBe(
    false
  );
  expect(isGameOver([0, 0, 0, 0, 0, 0, 0, 49, 0, 0, 0, 0, 0, 0, 49])).toBe(
    false
  );
  expect(isGameOver([1, 0, 0, 0, 0, 0, 0, 49, 1, 0, 0, 0, 0, 0, 49])).toBe(
    false
  );
  expect(isGameOver(generateCongklakInitialState())).toBe(false);
});

test("tests isPlayer1OutOfMove", () => {
  expect(
    isPlayer1OutOfMove([0, 0, 0, 0, 0, 0, 0, 49, 0, 0, 0, 0, 0, 0, 0, 49])
  ).toBe(true);

  expect(
    isPlayer1OutOfMove([1, 0, 0, 0, 0, 0, 0, 49, 0, 0, 0, 0, 0, 0, 0, 49])
  ).toBe(false);

  expect(
    isPlayer1OutOfMove([0, 0, 0, 0, 0, 0, 0, 49, 1, 1, 0, 0, 0, 0, 49])
  ).toBe(true);
});

test("tests isPlayer2OutOfMove", () => {
  expect(
    isPlayer2OutOfMove([0, 0, 0, 0, 0, 0, 0, 49, 0, 0, 0, 0, 0, 0, 0, 49])
  ).toBe(true);

  expect(
    isPlayer2OutOfMove([1, 0, 0, 0, 0, 0, 0, 49, 0, 0, 0, 0, 0, 0, 0, 49])
  ).toBe(true);

  expect(
    isPlayer2OutOfMove([1, 0, 0, 0, 0, 0, 0, 49, 1, 1, 0, 0, 0, 0, 49])
  ).toBe(false);
});

test("tests getNextHoleNumber", () => {
  expect(getNextHoleNumber(0)).toBe(1);
  expect(getNextHoleNumber(6)).toBe(7);
  expect(getNextHoleNumber(15)).toBe(0);
});

test("tests getPlayer1PlayableHoles", () => {
  expect(
    getPlayer1PlayableHoles([1, 2, 3, 4, 5, 6, 7, 49, 0, 0, 0, 0, 0, 0, 0, 49])
  ).toEqual([1, 2, 3, 4, 5, 6, 7]);
});

test("tests getPlayer2PlayableHoles", () => {
  expect(
    getPlayer2PlayableHoles([
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      49,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      49
    ])
  ).toEqual([8, 9, 10, 11, 12, 13, 14]);
});

test("tests isInOwnArea", () => {
  expect(isInOwnArea(6, 1)).toBe(true);
  expect(isInOwnArea(6, 2)).toBe(false);
  expect(isInOwnArea(7, 1)).toBe(false);
  expect(isInOwnArea(10, 2)).toBe(true);
  expect(isInOwnArea(10, 1)).toBe(false);
  expect(isInOwnArea(15, 2)).toBe(false);
});

test("tests getOwnScoreHoleNumber", () => {
  expect(getOwnScoreHoleNumber(1)).toBe(PLAYER1_SCORE_HOLE_NUMBER);
  expect(getOwnScoreHoleNumber(2)).toBe(PLAYER2_SCORE_HOLE_NUMBER);
});

test("tests getEnemyScoreHoleNumber", () => {
  expect(getEnemyScoreHoleNumber(1)).toBe(PLAYER2_SCORE_HOLE_NUMBER);
  expect(getEnemyScoreHoleNumber(2)).toBe(PLAYER1_SCORE_HOLE_NUMBER);
});

test("tests getNextTurn", () => {
  expect(getNextTurn(1)).toBe(2);
  expect(getNextTurn(2)).toBe(1);
});

test("tests isScoreHole", () => {
  expect(isScoreHole(7)).toBe(true);
  expect(isScoreHole(15)).toBe(true);
  expect(isScoreHole(0)).toBe(false);
  expect(isScoreHole(14)).toBe(false);
});
