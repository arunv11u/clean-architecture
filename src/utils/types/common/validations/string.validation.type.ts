export interface BaseStringValidation {
  checkStrMaxLen(inputData: string, length: number): boolean;
  checkStrMinLen(inputData: string, length: number): boolean;
  checkValidEmail(inputData: string): boolean;
  allowEmptyStr(inputData: string): boolean;
  checkRegexMatch(inputData: string, regexPattern: RegExp): boolean;
};
