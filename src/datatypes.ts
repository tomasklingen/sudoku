export type Grid = CellDetails[];

export interface CellDetails {
  value?: number;
  initialValue: boolean;
  isWrong: boolean;
}

export type FieldData = (number | undefined)[];
