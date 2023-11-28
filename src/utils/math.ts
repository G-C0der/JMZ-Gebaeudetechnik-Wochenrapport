const round = (number: number, decimals: number = 2) => {
  const factor = '1' + '0'.repeat(decimals);
  return Math.round(number * +factor) / +factor;
};

export {
  round
};