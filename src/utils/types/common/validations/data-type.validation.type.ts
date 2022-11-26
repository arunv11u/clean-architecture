export interface DataTypeValidation {
  checkFieldIsString(inputData: string): boolean;
  checkFieldIsNumber(inputData: number): boolean;
  checkFieldIsBoolean(inputData: boolean): boolean;
  checkFieldIsObject(inputData: Record<string, any>): boolean;
  checkFieldIsArray(inputData: Array<any>): boolean;
}
