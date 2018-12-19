import { FieldData } from "./datatypes";

// standard 9*9 sudoku grid

type Position = { row: number; col: number };

export const isValidValue = (
  value: number,
  index: number,
  field: FieldData
) => {
  const pos = indexToPosition(index);

  return !(
    valueExistsInSameRow(value, pos.row, field) &&
    valueExistsInSameCol(value, pos.col, field) &&
    valueExistsInSameRegion(value, pos, field)
  );
};

const valueExistsInSameRegion = (
  value: number,
  pos: Position,
  field: FieldData
) => {
  // const regionRange = getRangeFromSubGrid(pos, field);
  return false;
};

const valueExistsInSameRow = (value: number, row: number, field: FieldData) => {
  const rowRange = getRowRangeFromField(row, field);
  return rowRange.includes(value);
};

const valueExistsInSameCol = (value: number, col: number, field: FieldData) => {
  const colRange = getColRangeFromField(col, field);
  return colRange.includes(value);
};

const getRowRangeFromField = (row: number, field: FieldData) => {
  return field.filter((_, idx) => row === indexToPosition(idx).row);
};

const getColRangeFromField = (col: number, field: FieldData) => {
  return field.filter((_, idx) => col === indexToPosition(idx).col);
};

const indexToPosition = (index: number): Position => ({
  row: Math.floor(index / 9),
  col: index % 9
});
