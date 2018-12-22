export interface CellDetails {
  value?: number;
  isInitialValue: boolean;
}

export interface ValidatedCell extends CellDetails {
  isValid: boolean; 
}

export type FieldData = (number | undefined)[];
