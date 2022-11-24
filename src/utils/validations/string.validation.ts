import { GenericError } from "../errors";
import { BaseStringValidation } from "../types";

export class StringValidation implements BaseStringValidation {
  private static _instance: BaseStringValidation;

  private constructor() { };

  static getInstance(): BaseStringValidation {
    if (!StringValidation._instance)
      StringValidation._instance = new StringValidation();

    return StringValidation._instance;
  };

  checkStrMaxLen(inputData: string, length: number): boolean {
    if (!inputData || typeof inputData !== "string")
      throw new GenericError({
        error: new Error("Input data is invalid, expected a string"),
        errorCode: 500
      });
    if (!length || typeof length !== "number")
      throw new GenericError({
        error: new Error("Maximum length input is invalid, expected a number"),
        errorCode: 500
      });

    if (inputData.length <= length) return true;

    return false;
  };

  checkStrMinLen(inputData: string, length: number): boolean {
    if (!inputData || typeof inputData !== "string")
      throw new GenericError({
        error: new Error("Input data is invalid, expected a string"),
        errorCode: 500
      });
    if (!length || typeof length !== "number")
      throw new GenericError({
        error: new Error("Minimum length input is invalid, expected a number"),
        errorCode: 500
      });

    if (inputData.length >= length) return true;

    return false;
  };

  checkValidEmail(inputData: string): boolean {
    if (!inputData || typeof inputData !== "string")
      throw new GenericError({
        error: new Error("Input data is invalid, expected a string"),
        errorCode: 500
      });

    return !!String(inputData)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  allowEmptyStr(inputData: string): boolean {
    if ((inputData !== "" && !inputData) || typeof inputData !== "string")
      throw new GenericError({
        error: new Error("Input data is invalid, expected a string"),
        errorCode: 500
      });

    return true;
  };

  checkRegexMatch(inputData: string, regexPattern: RegExp): boolean {
    if (!inputData || typeof inputData !== "string")
      throw new GenericError({
        error: new Error("Input data is invalid, expected a string"),
        errorCode: 500
      });

    return !!String(inputData).match(regexPattern);
  };
}
