import { div, span, VNode } from "@cycle/dom";
import { isValidValue } from "./validation";
import { Grid, CellDetails, FieldData } from "./datatypes";
import { style } from "typestyle";

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
  const rawData = fieldData.map(d => d.value);

  const cells = fieldData.map((cell, idx) => {
    return renderGridCell(cell, idx, rawData);
  });

  return div(`.${sudokuClass}`, cells);
}

function renderGridCell(
  cell: CellDetails,
  idx: number,
  rawData: FieldData
): VNode {
  let cssClass = `.${cellClass}`;
  if (
    !cell.initialValue &&
    cell.value &&
    !isValidValue(cell.value, idx, rawData)
  ) {
    cssClass += ` .${redClass}`;
  }

  return div(cssClass, [span(cell.value)]);
}
