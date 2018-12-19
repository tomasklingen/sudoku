import { DOMSource } from "@cycle/dom";
import { renderSudoku } from "./renderer";
import { createRandomSudokuData } from "./sudoku";

interface Sources {
  DOM: DOMSource;
}

export const App = (sources: Sources) => {
  const vdom$ = sources.DOM.events("click")
    .mapTo(1)
    .startWith(1)
    .map(() => {
      const cellData = createRandomSudokuData(10);
      return renderSudoku(cellData);
    });

  return {
    DOM: vdom$
  };
};
