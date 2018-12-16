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

const redClass = style({ color: 'red' });

export type CellData = CellDetails[];

interface CellDetails {
  value?: number;
  initialValue?: boolean;
}

function renderSudoku(cellData: CellData) {
  const rawData = cellData.map(d => d.value);
  const cells = new Array(81).fill(undefined).map((_, idx) => {
    const cellValue = cellData[idx].value;
    let cssClass = `.${cellClass}`;
    if(cellValue && !isValidNumber(cellValue, idx % 9, Math.floor(idx/9), rawData)){
      cssClass += ` .${redClass}`;
    };

    return div(cssClass, [span(cellValue)]);
  });
  return div(`.${sudokuClass}`, cells);
}

function createRandomSudokuData(): CellData {
  const cells = [...Array(81)].fill(undefined).map(() => {
    const value = Math.round(Math.random() * 35) + 1;
    return {
      value: value <= 9 ? value : undefined,
      initialValue: true
    };
  });
  return cells;
}

interface Sources {
  DOM: DOMSource;
}

export const App = (sources: Sources) => {
  const vdom$ = sources.DOM.events("click").map(() => {
    const cellData: CellData = createRandomSudokuData();
    return renderSudoku(cellData);
  });

  return {
    DOM: vdom$
  };
};
