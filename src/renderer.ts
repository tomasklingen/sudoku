import { div, span, VNode } from "@cycle/dom";
import { style } from "typestyle";
import { ValidatedCell } from "./datatypes";
import { NestedCSSProperties } from "typestyle/lib/types";

export const renderSudoku = (fieldData: ValidatedCell[]): VNode => {
  const cellNodes = fieldData.map(renderGridCell);

  return div([div(`.${sudokuClass}`, cellNodes)]);
};

const renderGridCell = (cell: ValidatedCell): VNode => {
  let cssClass = "";

  if (cell.value && !cell.isValid) {
    cssClass = `.${redClass}`;
  }

  return div(cssClass, cell.value || "");
};

/* CSS */

const cellStyleProps: NestedCSSProperties = {
  border: "1px solid #000",
  textAlign: "center",
  lineHeight: "70px",
  fontSize: "2em",
  $nest: {
    "&:nth-child(9n - 3), &:nth-child(9n - 6)": {
      borderRight: "4px solid #000"
    },
    "&:nth-child(n + 19):nth-child(-n + 27), &:nth-child(n + 46):nth-child(-n + 54)": {
      borderBottom: "4px solid #000"
    }
  }
};

const sudokuClass: string = style({
  margin: 50,
  display: "grid",
  gridTemplateRows: "repeat(9, 70px)",
  gridTemplateColumns: "repeat(9, 70px)",
  $nest: {
    div: cellStyleProps
  }
});

const redClass = style({
  color: "red"
});
