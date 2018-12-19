import { DOMSource } from "@cycle/dom";
import { renderSudoku } from "./renderer";
import { createSudokuGrid } from "./sudoku";

interface Sources {
  DOM: DOMSource;
}

export const App = (sources: Sources) => {
  const vdom$ = sources.DOM.events("click")
    .mapTo(1)
    .startWith(1)
    .map(() => {
      const grid = createSudokuGrid(10);
      return renderSudoku(grid);
    });

  return {
    DOM: vdom$
  };
};
