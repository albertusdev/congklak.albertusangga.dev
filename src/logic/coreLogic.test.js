import { generateCongklakInitialState } from "./congklakLogicUtils";
import { getCongklakNextState } from "./coreLogic";

it("tests getCongklakNextState", async () => {
  let state = generateCongklakInitialState();
  expect(await getCongklakNextState(state, 1, 0)).toEqual([
    0,
    8,
    8,
    8,
    8,
    8,
    8,
    1,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    0
  ]);
});
