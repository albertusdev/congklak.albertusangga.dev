export const waitFor = milliseconds => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, milliseconds);
  });
};
