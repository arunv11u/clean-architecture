export interface ArrayValidation {
  checkMaxLen(inputData: Array<any>, length: number): boolean;
  checkMinLen(inputData: Array<any>, length: number): boolean;
  checkArrOfStr(inputData: Array<string>): boolean;
  checkArrOfNum(inputData: Array<number>): boolean;
  checkArrOfBool(inputData: Array<boolean>): boolean;
}
