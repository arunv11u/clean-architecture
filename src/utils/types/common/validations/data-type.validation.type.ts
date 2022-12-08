export interface DataTypeValidation {
  checkFieldIsString(inputData: string | undefined): boolean;
  checkFieldIsNumber(inputData: number | undefined): boolean;
  checkFieldIsBoolean(inputData: boolean | undefined): boolean;
  checkFieldIsObject(inputData: Record<string, any> | undefined): boolean;
  checkFieldIsArray(inputData: Array<any> | undefined): boolean;
}
