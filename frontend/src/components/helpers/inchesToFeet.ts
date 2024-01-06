export const inchesToFeet = (inches: number): string => {
  const feet = Math.floor(inches / 12);
  const _inches = Math.floor((inches / 12 - feet) * 10);
  return feet.toString() + "'" + _inches.toString();
};
