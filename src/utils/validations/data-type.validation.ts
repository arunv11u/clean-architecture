import { GenericError } from "../errors";
import { DataTypeValidation } from "../types";

export class DataTypeValidationImpl implements DataTypeValidation {

  constructor() { };

  checkFieldIsString(inputData: string): boolean {
    if (!inputData)
      throw new GenericError({
        error: new Error("Input data is invalid, expected a string"),
        errorCode: 500,
      });

    return typeof inputData === "string";
  };

  checkFieldIsNumber(inputData: number): boolean {
    if (inputData !== 0 && !inputData)
      throw new GenericError({
        error: new Error("Input data is invalid, expected a number"),
        errorCode: 500,
      });

    return typeof inputData === "number";
  };

  checkFieldIsBoolean(inputData: boolean): boolean {
    if (inputData !== false && !inputData)
      throw new GenericError({
        error: new Error("Input data is invalid, expected a boolean"),
        errorCode: 500,
      });

    return typeof inputData === "boolean";
  };

  checkFieldIsObject(inputData: Record<string, any>): boolean {
    if (!inputData)
      throw new GenericError({
        error: new Error("Input data is invalid, expected an object"),
        errorCode: 500,
      });

    return Object(inputData).constructor.name === "Object";
  };

  checkFieldIsArray(inputData: Array<any>): boolean {
    if (!inputData)
      throw new GenericError({
        error: new Error("Input data is invalid, expected an array"),
        errorCode: 500,
      });

    return Object(inputData).constructor.name === "Array";
  };
};
