import { GenericError } from "../errors";
import { ArrayValidation } from "../types";

export class ArrayValidationImpl implements ArrayValidation {

  constructor() { };

  checkMaxLen(inputData: Array<any>, length: number) {
    if (!inputData || Object(inputData).constructor.name !== "Array")
      throw new GenericError({
        error: new Error("Input data is invalid, expected an array"),
        errorCode: 500,
      });
    if (!length || typeof length !== "number")
      throw new GenericError({
        error: new Error("Maximum length input is invalid, expected a number"),
        errorCode: 500,
      });

    return inputData.length <= length;
  };

  checkMinLen(inputData: Array<any>, length: number) {
    if (!inputData || Object(inputData).constructor.name !== "Array")
      throw new GenericError({
        error: new Error("Input data is invalid, expected an array"),
        errorCode: 500,
      });
    if (!length || typeof length !== "number")
      throw new GenericError({
        error: new Error("Minimum length input is invalid, expected a number"),
        errorCode: 500,
      });

    return inputData.length >= length;
  };

  checkArrOfStr(inputData: Array<string>) {
    if (!inputData || Object(inputData).constructor.name !== "Array")
      throw new GenericError({
        error: new Error("Input data is invalid, expected an array of strings"),
        errorCode: 500,
      });

    for (let ele of inputData)
      if (typeof ele !== "string")
        throw new GenericError({
          error: new Error(
            "Input data is invalid, expected an array of strings"
          ),
          errorCode: 500,
        });

    return true;
  };

  checkArrOfNum(inputData: Array<number>) {
    if (!inputData || Object(inputData).constructor.name !== "Array")
      throw new GenericError({
        error: new Error("Input data is invalid, expected an array of numbers"),
        errorCode: 500,
      });

    for (let ele of inputData)
      if (typeof ele !== "number")
        throw new GenericError({
          error: new Error(
            "Input data is invalid, expected an array of numbers"
          ),
          errorCode: 500,
        });

    return true;
  };

  checkArrOfBool = (inputData: Array<boolean>) => {
    if (!inputData || Object(inputData).constructor.name !== "Array")
      throw new GenericError({
        error: new Error(
          "Input data is invalid, expected an array of booleans"
        ),
        errorCode: 500,
      });

    for (let ele of inputData)
      if (typeof ele !== "boolean")
        throw new GenericError({
          error: new Error(
            "Input data is invalid, expected an array of booleans"
          ),
          errorCode: 500,
        });

    return true;
  };
};
