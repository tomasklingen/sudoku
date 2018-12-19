import { DOMSource } from "@cycle/dom";
import { FieldData, Grid } from "./datatypes";
import { renderSudoku } from "./renderer";
import { isValidValue } from "./validation";

function createRandomSudokuData(prefills: number): Grid {
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

interface Sources {
  DOM: DOMSource;
}

export const App = (sources: Sources) => {
  const vdom$ = sources.DOM.events("click")
    .mapTo(1)
    .startWith(1)
    .map(() => {
      const cellData: Grid = createRandomSudokuData(10);
      return renderSudoku(cellData);
    });

  return {
    DOM: vdom$
  };
};
