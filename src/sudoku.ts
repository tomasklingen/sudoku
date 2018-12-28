import { CellDetails, FieldData } from "./datatypes";
import { createClassicSudokuValidator } from "./validation/sudoku-validator";

/**
 * Creates a Sudoku grid object.
 * @param numPrefilledCells Number of random cells to be randomly generated and filled.
 */
export const createSudokuGrid = (numPrefilledCells = 0): CellDetails[] => {
  let maxTries = 5000;
  const fieldData: FieldData = [...Array(81)].fill(undefined);
  const freeCells = new Set(fieldData.map((_, i) => i));
  let validator = createClassicSudokuValidator(fieldData);

  while (numPrefilledCells > 0 && --maxTries > 0) {
    const value = Math.ceil(Math.random() * 9);
    const randomIndex = Array.from(freeCells)[
      Math.floor(Math.random() * freeCells.size)
    ];

    if (validator.isValidValue(value, randomIndex).isValid) {
      fieldData[randomIndex] = value;
      freeCells.delete(randomIndex);
      numPrefilledCells--;
      validator = createClassicSudokuValidator(fieldData);
    }
  }

  console.log(Array.from(freeCells));

  return fieldData.map(value => {
    return {
      value,
      isInitialValue: !!value
    } as CellDetails;
  });
};
