import { FieldData } from "../datatypes";
import {
  classicRegionValidator,
  hyperSudokuRegionValidator,
  RegionValidator
} from "./sudoku-region-validation";

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

export const createClassicSudokuValidator = (
  field: FieldData
): SudokuValidator => {
  const validator = classicRegionValidator(field);
  return new SudokuValidator(field, validator);
};

export const createHyperSudokuValidator = (
  field: FieldData
): SudokuValidator => {
  const validator = hyperSudokuRegionValidator(field);
  return new SudokuValidator(field, validator);
};

export class SudokuValidator {
  private readonly indexToRow: (index: number) => number;
  private readonly indexToCol: (index: number) => number;
  private readonly valueExistsInSameRegion: RegionValidator;

  constructor(
    private readonly field: FieldData,
    readonly regionValidator: RegionValidator
  ) {
    const size = Math.sqrt(field.length);

    if (size % 1 !== 0) {
      throw new Error("Field is of uneven size.");
    }

    this.indexToRow = (index: number) => Math.floor(index / size);
    this.indexToCol = (index: number) => index % size;
    this.valueExistsInSameRegion = regionValidator;
  }

  isValidValue = (value: number, index: number): ValidationResult => {
    if (this.field[index] === value) {
      return {
        isValid: true
      };
    }

    let error: SudokuError = SudokuError.NoError;

    if (this.valueExistsInSameRow(value, index)) {
      error |= SudokuError.SameRow;
    }
    if (this.valueExistsInSameCol(value, index)) {
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

  private valueExistsInSameRow = (value: number, index: number) => {
    const valueRow = this.indexToRow(index);
    return this.field
      .filter((_, i) => valueRow === this.indexToRow(i))
      .includes(value);
  };

  private valueExistsInSameCol = (value: number, index: number) => {
    const valueCol = this.indexToCol(index);
    return this.field
      .filter((_, i) => valueCol === this.indexToCol(i))
      .includes(value);
  };
}
