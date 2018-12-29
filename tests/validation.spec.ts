import { FieldData } from "../src/datatypes";
import {
  SudokuValidator,
  SudokuError,
  ValidationResult
} from "../src/validation/sudoku-validator";
import { RegionValidator } from "../src/validation/sudoku-region-validation";

describe("validation", () => {
  const mockRegionValidator: RegionValidator = () => false;

  it("should mark the value that already exists as valid", () => {
    const field: FieldData = [1, 0, 0, 0];
    const validator = new SudokuValidator(field, mockRegionValidator);

    const result = validator.isValidValue(1, 0).isValid;

    expect(result).toBe(true);
  });

  it("should only allow valid numbers from 0 to 9 to be validated", () => {
    // negative number
    const invalidField: FieldData = [-1, 0, 0, 0];
    expect(() => {
      new SudokuValidator(invalidField, mockRegionValidator);
    }).toThrow();

    // float
    const invalidField2: FieldData = [1.1, 0, 0, 0];
    expect(() => {
      new SudokuValidator(invalidField2, mockRegionValidator);
    }).toThrow();

    // valid field
    const validField: FieldData = [1, 0, 0, 0];
    expect(() => {
      new SudokuValidator(validField, mockRegionValidator);
    }).not.toThrow();
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

  describe("region violation", () => {
    it("should return an error if the value already exists in the same region", () => {
      const field: FieldData = [0, 0, 0, 0];
      const regionValidator: RegionValidator = () => true;
      const validator = new SudokuValidator(field, regionValidator);
      const result = validator.isValidValue(1, 1);

      if (result.isValid === true) {
        fail();
        return;
      }

      expect(result.errors).toBe(SudokuError.SameRegion);
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
