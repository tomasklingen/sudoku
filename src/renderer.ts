import { div, span, VNode } from "@cycle/dom";
import { style, cssRule } from "typestyle";
import { CellDetails } from "./datatypes";

export const renderSudoku = (fieldData: CellDetails[]): VNode => {
  const cellNodes = fieldData.map(renderGridCell);

  return div(`.${sudokuClass}`, cellNodes);
};

const renderGridCell = (cell: CellDetails): VNode => {
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

cssRule("#app", {
  display: 'flex',
  justifyContent: 'center'
});
