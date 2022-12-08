export interface ArrayValidation {
  checkMaxLen(inputData: Array<any> | undefined, length: number): boolean;
  checkMinLen(inputData: Array<any> | undefined, length: number): boolean;
  checkArrOfStr(inputData: Array<string> | undefined): boolean;
  checkArrOfNum(inputData: Array<number> | undefined): boolean;
  checkArrOfBool(inputData: Array<boolean> | undefined): boolean;
}
