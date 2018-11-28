import { getChoice } from "./ai";

it("test on corner case", async () => {
  let state = [0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 1, 50];
  expect(await getChoice(state, 2)).toBe(14);
});
