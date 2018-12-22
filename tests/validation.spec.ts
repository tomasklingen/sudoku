import { FieldData } from "../src/datatypes";
import { SudokuError, SudokuValidator, ValidationResult } from "../src/validation";

describe("validation", () => {
  it("should mark the value that already exists as valid", () => {
    const field: FieldData = [1, 0, 0, 0];
    const validator = new SudokuValidator(field);

    const result = validator.isValidValue(1, 0).isValid;

    expect(result).toBe(true);
  });

  describe("same row violation", () => {
    let result: ValidationResult;

    beforeEach(() => {
      const field: FieldData = [1, 0, 0, 0];
      const validator = new SudokuValidator(field);

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
      const validator = new SudokuValidator(field);

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
    it("should retun a combination of error flags to indicate multiple violations", () => {
      const field: FieldData = [1, 0, 0, 1];
      const validator = new SudokuValidator(field);
      const result = validator.isValidValue(1, 1);

      if (result.isValid === true) {
        fail();
        return;
      }

      expect(result.errors).toBe(SudokuError.SameCol | SudokuError.SameRow);
    });
  });
});
