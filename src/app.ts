import { DOMSource, VNode } from "@cycle/dom";
import { Stream } from "xstream";
import { CellDetails, ValidatedCell } from "./datatypes";
import { renderSudoku } from "./renderer";
import { createSudokuGrid } from "./sudoku";
import { createClassicSudokuValidator } from "./validation/sudoku-validator";

export interface Sinks {
  dom: Stream<VNode>;
}

export interface Sources {
  dom: DOMSource;
}

const validateGrid = (grid: CellDetails[]): ValidatedCell[] => {
  const field = grid.map(c => c.value);
  const validator = createClassicSudokuValidator(field);

  return grid.map<ValidatedCell>((cell: CellDetails, index: number) => {
    const isValid = !!cell.value && validator.isValidValue(cell.value, index).isValid;

    return {
      ...cell, isValid
    };
  })
}

export const App = (sources: Sources): Sinks => {
  const vdom$ = sources.dom
    .events("click")
    .mapTo(1)
    .startWith(1)
    .map(() => {
      const grid = createSudokuGrid(10);
      const checkedGrid = validateGrid(grid);
      return renderSudoku(checkedGrid);
    });

  return {
    dom: vdom$
  };
};