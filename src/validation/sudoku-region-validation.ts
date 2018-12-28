import { FieldData } from "../datatypes";

/**
 * List of indici that make up a sudoku region of 9 numbers.
 */
type Region = [number, number, number, number, number, number, number, number, number];

const classicSudokuLayout: Region[] = [
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

const hyperLayout: Region[] = [
  ...classicSudokuLayout,
  [10, 11, 12, 19, 20, 21, 28, 29, 30],
  [14, 15, 16, 23, 24, 25, 32, 33, 34],
  [46, 47, 48, 55, 56, 57, 64, 65, 66],
  [50, 51, 52, 59, 60, 61, 68, 69, 70]
];

/**
 * 
 * @param layout list of regions that make up the Sudoku puzzle. 9 (3x3) in a classic Sudoku puzzle, 13 in a hyper Sudoku.
 */
const createRegionValidatorForLayout = (layout: Region[]) => (
  field: FieldData
): RegionValidator => (value: number, index: number) => {
  const regions = layout.filter((region: Region) => region.includes(index));
  const valuesForRegion = regions[0].map(indexInRegion => field[indexInRegion]);
  return valuesForRegion.includes(value);
};

/**
 * Indicates weither a 'value' (1-9) on position 'index' exists in the given field.
 */
export interface RegionValidator {
  (value: number, index: number): boolean;
}

export interface RegionValidatorGenerator {
  (field: FieldData): RegionValidator;
}

export const classicRegionValidator: RegionValidatorGenerator = createRegionValidatorForLayout(
  classicSudokuLayout
);

export const hyperSudokuRegionValidator: RegionValidatorGenerator = createRegionValidatorForLayout(
  hyperLayout
);