export interface StringValidation {
  checkStrMaxLen(inputData: string | undefined, length: number): boolean;
  checkStrMinLen(inputData: string | undefined, length: number): boolean;
  checkValidEmail(inputData: string | undefined): boolean;
  allowEmptyStr(inputData: string | undefined): boolean;
  checkRegexMatch(inputData: string | undefined, regexPattern: RegExp): boolean;
};
