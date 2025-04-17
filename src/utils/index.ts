/**
 * Appends 'px' to a number value
 * @param value - Number or string to append 'px' to
 * @returns String with 'px' appended
 */
export const toPx = (value: number | string): string => {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    throw new Error('value cannot be converted to a number');
  }
  return `${value}px`;
};
