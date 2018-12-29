import { CellDetails } from "./datatypes";

const EMPTY_FIELD_CHAR = " ";
const INITIAL_VALUE_CHAR = "+";
const NON_INITIAL_VALUE_CHAR = "-";

export function serializeGrid(rawInput: CellDetails[]): string {
  const input = rawInput
    .map(
      (cellDetail: CellDetails) =>
        `${cellDetail.value || EMPTY_FIELD_CHAR}${
          cellDetail.isInitialValue ? INITIAL_VALUE_CHAR : NON_INITIAL_VALUE_CHAR
        }`
    )
    .join("");

  return input;
}

export function deserializeGrid(input: string): CellDetails[] {
  const reducer = (
    output: CellDetails[],
    char: string,
    index: number,
    chars: string[]
  ) => {
    if (char === INITIAL_VALUE_CHAR || char === NON_INITIAL_VALUE_CHAR) {
      const previousChar = index > 0 ? chars[index - 1] : undefined;
      const value =
        previousChar && previousChar !== " "
          ? parseInt(previousChar)
          : 0;

      output.push({
        isInitialValue: char === INITIAL_VALUE_CHAR,
        value: value
      });
    }

    return output;
  };

  return input.split("").reduce(reducer, [] as CellDetails[]);
}
