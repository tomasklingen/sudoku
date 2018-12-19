import { div, span, VNode } from "@cycle/dom";
import { style } from "typestyle";
import { CellDetails, Grid } from "./datatypes";

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

export function renderSudoku(fieldData: Grid): VNode {
  const cells = fieldData.map((cell, idx) => {
    return renderGridCell(cell, idx);
  });

  return div(`.${sudokuClass}`, cells);
}

function renderGridCell(
  cell: CellDetails,
  idx: number
): VNode {
  let cssClass = `.${cellClass}`;
  if (
    !cell.initialValue &&
    cell.value &&
    cell.isWrong
  ) {
    cssClass += ` .${redClass}`;
  }

  return div(cssClass, [span(cell.value)]);
}
