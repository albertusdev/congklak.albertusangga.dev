export const waitFor = milliseconds => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, milliseconds);
  });
};
export const isInOwnArea = (holeNumber, playerNumber) =>
  holeNumber >= (playerNumber - 1) * 8 && holeNumber < playerNumber * 8 - 1;

export const getNextHoleNumber = holeNumber => (holeNumber + 1) % 16;

export const generateCongklakInitialState = () => {
  let arr = new Array(16);
  for (let i = 0; i <= 15; ++i) {
    if (i === 7 || i === 15) arr[i] = 0;
    else arr[i] = 7;
  }
  return arr;
};
