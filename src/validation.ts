// standard sudoku

export function isValidNumber(
  value: number,
  col: number,
  row: number,
  field: (number | undefined)[]
) {
  // same value in row?
  const rowRange = field.filter((_, idx) => {
    const curRow = Math.floor(idx / 9);
    const curCol = idx % 9;

    return curRow === row && curCol !== col;
  });
  if (rowRange.includes(value)) {
    return false;
  }

  // same value in col?
  const colRange = field.filter((_, idx) => {
    const curRow = Math.floor(idx / 9);
    const curCol = idx % 9;

    return curCol === col && curRow !== row;
  });
  if (colRange.includes(value)) {
    return false;
  }

  // neighbourhood

  return true;
}
