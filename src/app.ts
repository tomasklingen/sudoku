import { DOMSource, VNode } from "@cycle/dom";
import { renderSudoku } from "./renderer";
import { createSudokuGrid } from "./sudoku";
import { Stream } from "xstream";
import { CellDetails, ValidatedCell } from "./datatypes";
import { SudokuValidator } from "./validation";

export interface Sinks {
  dom: Stream<VNode>;
}

export interface Sources {
  dom: DOMSource;
}

const checkGrid = (grid: CellDetails[]): ValidatedCell[] => {
  const validator = new SudokuValidator(grid.map(c => c.value));

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
      const checkedGrid = checkGrid(grid);
      return renderSudoku(checkedGrid);
    });

  return {
    dom: vdom$
  };
};