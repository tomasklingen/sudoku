import { div, DOMSource, span } from "@cycle/dom";
import { style } from "typestyle";
import { isValidNumber } from "./validation";

const cellClass = style({
  border: "1px solid",
  textAlign: "center",
  lineHeight: "70px",
  fontSize: "2em"
});

const sudokuClass = style({
  margin: 50,
  display: "grid",
  gridTemplate: "repeat(9, 70px) / repeat(9, 70px)",
  gridGap: 3
});

const redClass = style({ color: "red" });

export type FieldData = CellDetails[];

interface CellDetails {
  value?: number;
  initialValue?: boolean;
}

function renderSudoku(fieldData: FieldData) {
  const rawData = fieldData.map(d => d.value);
  const cells = new Array(81).fill(undefined).map((_, idx) => {
    const cell = fieldData[idx];

    let cssClass = `.${cellClass}`;
    if (!cell.initialValue && cell.value && !isValidNumber(cell.value, idx, rawData)) {
      cssClass += ` .${redClass}`;
    }

    return div(cssClass, [span(cell.value)]);
  });
  return div(`.${sudokuClass}`, cells);
}

function createRandomSudokuData(): FieldData {
  const cells = [...Array(81)].fill(undefined);
  let prefills = 10;
  while (prefills > 0) {
    const value = Math.ceil(Math.random() * 9);
    const randomIndex = Math.floor(Math.random() * 81);
    if (
      cells[randomIndex] === undefined &&
      isValidNumber(value, randomIndex, cells)
    ) {
      cells[randomIndex] = value;
      prefills--;
    }
  }

  return cells.map(value => {
    return {
      value,
      initialValue: true
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
      const cellData: FieldData = createRandomSudokuData();
      return renderSudoku(cellData);
    });

  return {
    DOM: vdom$
  };
};
