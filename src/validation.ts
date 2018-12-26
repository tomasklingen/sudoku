import { FieldData } from "./datatypes";

interface ValidResult {
  isValid: true;
}
interface InvalidResult {
  isValid: false;
  errors: SudokuError;
}

export type ValidationResult = ValidResult | InvalidResult;

export enum SudokuError {
  NoError = 0,
  SameRow = 1 << 0,
  SameCol = 1 << 1,
  SameRegion = 1 << 2
}

type Position = { row: number; col: number };

export class SudokuValidator {
  private readonly positionInField: (index: number) => Position;

  constructor(private readonly field: FieldData) {
    const size = Math.sqrt(field.length);

    if (size % 1 !== 0) {
      throw new Error("Field is of uneven size.");
    }

    this.positionInField = (index: number): Position => ({
      row: Math.floor(index / size),
      col: index % size
    });
  }

  isValidValue = (value: number, index: number): ValidationResult => {
    if (this.field[index] === value) {
      return {
        isValid: true
      };
    }

    const pos = this.positionInField(index);

    let error: SudokuError = SudokuError.NoError;

    if (this.valueExistsInSameRow(value, pos.row)) {
      error |= SudokuError.SameRow;
    }
    if (this.valueExistsInSameCol(value, pos.col)) {
      error |= SudokuError.SameCol;
    }
    if (this.valueExistsInSameRegion(value, index)) {
      error |= SudokuError.SameRegion;
    }

    if (error) {
      return {
        isValid: false,
        errors: error
      };
    } else {
      return { isValid: true };
    }
  };

  private valueExistsInSameRegion = (value: number, index: number) => {
    const islands = originalSudokuField.filter((island: number[]) =>
      island.includes(index)
    );

    const valuesForIsland = islands[0].map(
      indexInIsland => this.field[indexInIsland]
    );

    return valuesForIsland.includes(value);
  };

  private valueExistsInSameRow = (value: number, row: number) => {
    return this.field
      .filter((_, index) => row === this.positionInField(index).row)
      .includes(value);
  };

  private valueExistsInSameCol = (value: number, col: number) => {
    return this.field
      .filter((_, index) => col === this.positionInField(index).col)
      .includes(value);
  };
}

const originalSudokuField = [
  [0, 1, 2, 9, 10, 11, 18, 19, 20],
  [3, 4, 5, 12, 13, 14, 21, 22, 23],
  [6, 7, 8, 15, 16, 17, 24, 25, 26],
  [27, 28, 29, 36, 37, 38, 45, 46, 47],
  [30, 31, 32, 39, 40, 41, 48, 49, 50],
  [33, 34, 35, 42, 43, 44, 51, 52, 53],
  [54, 55, 56, 63, 64, 65, 72, 73, 74],
  [57, 58, 59, 66, 67, 68, 75, 76, 77],
  [60, 61, 62, 69, 70, 71, 78, 79, 80]
];

const hyperSudokuField = [
  ...originalSudokuField,
  [10, 11, 12, 19, 20, 21, 28, 29, 30],
  [14, 15, 16, 23, 24, 25, 32, 33, 34],
  [46, 47, 48, 55, 56, 57, 64, 65, 66],
  [50, 51, 52, 59, 60, 61, 68, 69, 70]
];
