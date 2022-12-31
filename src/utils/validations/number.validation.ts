import { GenericError } from "../errors";
import { NumberValidation } from "../types";

export class NumberValidationImpl implements NumberValidation {

  constructor() { };

  checkNumMaxVal = (input: number | undefined, maxValue: number) => {
    if ((input !== 0 && !input) || typeof input !== "number")
      throw new GenericError({
        error: new Error("Input data is invalid, expected a number"),
        errorCode: 500,
      });
    if ((maxValue !== 0 && !maxValue) || typeof maxValue !== "number")
      throw new GenericError({
        error: new Error("Maximum value input is invalid, expected a number"),
        errorCode: 500,
      });

    return input <= maxValue;
  };

  checkNumMinVal = (input: number | undefined, minValue: number) => {
    if ((input !== 0 && !input) || typeof input !== "number")
      throw new GenericError({
        error: new Error("Input data is invalid, expected a number"),
        errorCode: 500,
      });
    if ((minValue !== 0 && !minValue) || typeof minValue !== "number")
      throw new GenericError({
        error: new Error("Minimum value input is invalid, expected a number"),
        errorCode: 500,
      });

    return input >= minValue;
  };
};
