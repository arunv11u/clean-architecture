import { DataTypeValidation } from "../types";

export class DataTypeValidationImpl implements DataTypeValidation {

  constructor() { };

  checkFieldIsString(inputData: string): boolean {
    return (!!inputData && typeof inputData === "string");
  };

  checkFieldIsNumber(inputData: number): boolean {
    return (inputData === 0 || (!!inputData && typeof inputData === "number"));
  };

  checkFieldIsBoolean(inputData: boolean): boolean {
    return (inputData === false || (!!inputData && typeof inputData === "boolean"));
  };

  checkFieldIsObject(inputData: Record<string, any>): boolean {
    return (!!inputData && Object(inputData).constructor.name === "Object");
  };

  checkFieldIsArray(inputData: Array<any>): boolean {
    return (!!inputData && Object(inputData).constructor.name === "Array");
  };
};
