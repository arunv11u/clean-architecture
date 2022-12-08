import { DataTypeValidation } from "../types";

export class DataTypeValidationImpl implements DataTypeValidation {

  constructor() { };

  checkFieldIsString(inputData: string | undefined): boolean {
    return (!!inputData && typeof inputData === "string");
  };

  checkFieldIsNumber(inputData: number | undefined): boolean {
    return (inputData === 0 || (!!inputData && typeof inputData === "number"));
  };

  checkFieldIsBoolean(inputData: boolean | undefined): boolean {
    return (inputData === false || (!!inputData && typeof inputData === "boolean"));
  };

  checkFieldIsObject(inputData: Record<string, any> | undefined): boolean {
    return (!!inputData && Object(inputData).constructor.name === "Object");
  };

  checkFieldIsArray(inputData: Array<any> | undefined): boolean {
    return (!!inputData && Object(inputData).constructor.name === "Array");
  };
};
