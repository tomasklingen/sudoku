export type Grid = CellDetails[];

export interface CellDetails {
  value?: number;
  initialValue: boolean;
  isValid: boolean;
}

export type FieldData = (number | undefined)[];
