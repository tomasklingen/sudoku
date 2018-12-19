import { FieldData, CellDetails } from "./datatypes";
import { isValidValue } from "./validation";

/**
 * Creates a Sudoku grid object.
 * @param numPrefilledCells Number of random cells to be randomly generated and filled.
 */
export const createSudokuGrid = (numPrefilledCells = 0): CellDetails[] => {
  const cells: FieldData = [...Array(81)].fill(undefined);

  while (numPrefilledCells > 0) {
    const value = Math.ceil(Math.random() * 9);
    const randomIndex = Math.floor(Math.random() * 81);

    if (
      cells[randomIndex] === undefined &&
      isValidValue(value, randomIndex, cells)
    ) {
      cells[randomIndex] = value;
      numPrefilledCells--;
    }
  }

  return cells.map(value => {
    return {
      value,
      isInitialValue: true,
      isValid: true
    } as CellDetails;
  });
};
