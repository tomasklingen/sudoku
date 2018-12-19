export type Grid = CellDetails[];

export interface CellDetails {
  value?: number;
  initialValue?: boolean;
}

export type FieldData = (number | undefined)[];
