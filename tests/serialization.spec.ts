import { CellDetails } from "../src/datatypes";
import { deserializeGrid, serializeGrid } from "../src/serialization";


describe("serialization", () => {
  it("should serialize empty values ", () => {
    const grid: CellDetails[] = [{ value: 0, isInitialValue: false }];
    const output = serializeGrid(grid);
    expect(output).toBe(" -");
  });

  it("should serialize multiple empty values", () => {
    const grid: CellDetails[] = Array(2).fill({
      value: undefined,
      isInitialValue: false
    });
    const output = serializeGrid(grid);
    expect(output).toBe(" - -");
  });

  it("should serialize filled values", () => {
    const grid: CellDetails[] = [{ value: 6, isInitialValue: false }];
    const output = serializeGrid(grid);
    expect(output).toBe("6-");
  });

  it("should serialize filled intial values", () => {
    const grid: CellDetails[] = [{ value: 6, isInitialValue: true }];
    const output = serializeGrid(grid);
    expect(output).toBe("6+");
  });
});

describe("deserialization", () => {
  it("should deserialize an empty grid", () => {
    const result = deserializeGrid("");
    expect(result).toEqual([]);
  });

  it("should deserialize a 1x1 grid with no filled value", () => {
    const input = " -";

    const result = deserializeGrid(input);
    expect(result).toEqual([
      { value: 0, isInitialValue: false } as CellDetails
    ]);
  });
});
