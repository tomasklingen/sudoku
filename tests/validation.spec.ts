import { FieldData } from "../src/datatypes";
import { SudokuValidator, SudokuError, ValidationResult } from "../src/validation/sudoku-validator";
import { RegionValidator } from "../src/validation/sudoku-region-validation";

describe("validation", () => {
  const mockRegionValidator: RegionValidator = () => false;

  it("should mark the value that already exists as valid", () => {
    const field: FieldData = [1, 0, 0, 0];
    const validator = new SudokuValidator(field, mockRegionValidator);

    const result = validator.isValidValue(1, 0).isValid;

    expect(result).toBe(true);
  });

  describe("same row violation", () => {
    let result: ValidationResult;

    beforeEach(() => {
      const field: FieldData = [1, 0, 0, 0];
      const validator = new SudokuValidator(field, mockRegionValidator);

      result = validator.isValidValue(1, 1);
    });

    it("should mark the result as invalid", () => {
      if (result.isValid === true) {
        fail();
        return;
      }

      expect(result.errors).toBe(SudokuError.SameRow);
    });
  });

  describe("same col violation", () => {
    let result: ValidationResult;

    beforeEach(() => {
      const field: FieldData = [1, 0, 0, 0];
      const validator = new SudokuValidator(field, mockRegionValidator);

      result = validator.isValidValue(1, 2);
    });

    it("should mark the result as invalid", () => {
      if (result.isValid === true) {
        fail();
        return;
      }

      expect(result.errors).toBe(SudokuError.SameCol);
    });
  });

  describe("combination violation", () => {
    it("should return a combination of error flags to indicate multiple violations", () => {
      const field: FieldData = [1, 0, 0, 1];
      const validator = new SudokuValidator(field, mockRegionValidator);
      const result = validator.isValidValue(1, 1);

      if (result.isValid === true) {
        fail();
        return;
      }

      expect(result.errors).toBe(SudokuError.SameCol | SudokuError.SameRow);
    });
  });
});
