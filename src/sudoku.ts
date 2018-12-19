import { FieldData, Grid } from "./datatypes";
import { isValidValue } from "./validation";

export function createRandomSudokuData(prefills: number): Grid {
  const cells: FieldData = [...Array(81)].fill(undefined);

  while (prefills > 0) {
    const value = Math.ceil(Math.random() * 9);
    const randomIndex = Math.floor(Math.random() * 81);

    if (
      cells[randomIndex] === undefined &&
      isValidValue(value, randomIndex, cells)
    ) {
      cells[randomIndex] = value;
      prefills--;
    }
  }

  return cells.map(value => {
    return {
      value,
      initialValue: true,
      isValid: false
    };
  });
}
