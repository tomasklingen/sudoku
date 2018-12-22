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
    if (this.valueExistsInSameRegion(value, pos)) {
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

  private valueExistsInSameRegion = (value: number, pos: Position) => {
    return false;
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
