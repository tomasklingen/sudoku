import { div, span, VNode } from "@cycle/dom";
import { style } from "typestyle";
import { ValidatedCell } from "./datatypes";

export const renderSudoku = (fieldData: ValidatedCell[]): VNode => {
  const cellNodes = fieldData.map(renderGridCell);

  return div([div(`.${sudokuClass}`, cellNodes)]);
};

const renderGridCell = (cell: ValidatedCell): VNode => {
  let cssClass = `.${cellClass}`;
  if (cell.value && !cell.isValid) {
    cssClass += ` .${redClass}`;
  }

  return div(cssClass, [span(cell.value)]);
};

/* CSS */

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
