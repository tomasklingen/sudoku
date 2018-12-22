import { FieldData, CellDetails, ValidatedCell } from "./datatypes";
import { SudokuValidator } from "./validation";

/**
 * Creates a Sudoku grid object.
 * @param numPrefilledCells Number of random cells to be randomly generated and filled.
 */
export const createSudokuGrid = (numPrefilledCells = 0): CellDetails[] => {
  let maxTries = 1000;
  const cells: FieldData = [...Array(81)].fill(undefined);
  let validator = new SudokuValidator(cells);

  while (numPrefilledCells > 0 && --maxTries > 0) {
    const value = Math.ceil(Math.random() * 9);
    const randomIndex = Math.floor(Math.random() * 81);

    if (
      cells[randomIndex] === undefined &&
      validator.isValidValue(value, randomIndex).isValid
    ) {
      cells[randomIndex] = value;
      numPrefilledCells--;
      validator = new SudokuValidator(cells);
    }
  }

  return cells.map(value => {
    return {
      value,
      isInitialValue: !!value
    } as CellDetails;
  });
};
