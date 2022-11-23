import { GenericError } from "../errors";
import { BaseNumberValidation } from "../types";

export class NumberValidation implements BaseNumberValidation {
  private static _instance: BaseNumberValidation;

  private constructor() {}

  static getInstance(): BaseNumberValidation {
    if (!NumberValidation._instance)
      NumberValidation._instance = new NumberValidation();

    return NumberValidation._instance;
  }

  checkNumMaxVal = (inputData: number, maxValue: number) => {
    if ((inputData !== 0 && !inputData) || typeof inputData !== "number")
      throw new GenericError({
        error: new Error("Input data is invalid, expected a number"),
        errorCode: 500,
      });
    if ((maxValue !== 0 && !maxValue) || typeof maxValue !== "number")
      throw new GenericError({
        error: new Error("Maximum value input is invalid, expected a number"),
        errorCode: 500,
      });

    return inputData <= maxValue;
  };

  checkNumMinVal = (inputData: number, minValue: number) => {
    if ((inputData !== 0 && !inputData) || typeof inputData !== "number")
      throw new GenericError({
        error: new Error("Input data is invalid, expected a number"),
        errorCode: 500,
      });
    if ((minValue !== 0 && !minValue) || typeof minValue !== "number")
      throw new GenericError({
        error: new Error("Minimum value input is invalid, expected a number"),
        errorCode: 500,
      });

    return inputData >= minValue;
  };
}
