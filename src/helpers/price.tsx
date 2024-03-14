const multiplyPrice = (price: number, multiplier: number) => {
  const asCents = price * 100;

  return (asCents * multiplier) / 100;
};

const displayPrice = (number: number) => {
  return number.toFixed(2) + "€";
};

export { multiplyPrice, displayPrice };
