// standard sudoku

type FieldData = (number | undefined)[];

export function isValidNumber(value: number, index: number, field: FieldData) {
  const pos = indexToPosition(index);

  // same value in row?
  const rowRange = getRowRangeFromField(pos.row, field);
  if (rowRange.includes(value)) {
    return false;
  }

  // same value in col?
  const colRange = getColRangeFromField(pos.col, field);
  if (colRange.includes(value)) {
    return false;
  }

  // neighbourhood
  return true;
}

const getRowRangeFromField = (row: number, field: FieldData) => {
  return field.filter((_, idx) => row === indexToPosition(idx).row);
};

const getColRangeFromField = (col: number, field: FieldData) => {
  return field.filter((_, idx) => col === indexToPosition(idx).col);
};

const indexToPosition = (index: number) => ({
  row: Math.floor(index / 9),
  col: index % 9
});
