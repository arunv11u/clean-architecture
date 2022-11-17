import { GenericValidationError } from '../../errors';
import { checkFieldIsNumber, checkFieldIsString, checkFieldIsBoolean, checkFieldIsObject, checkFieldIsArray } from '../type-check.validation';

describe("Basic Input Validation", () => {
    describe("Type check module", () => {

        describe(`"checkFieldIsString" fn`, () => {
            describe("Exception Path", () => {
                it("Input is not defined, should throw an error", () => {
                    expect(() => checkFieldIsString(undefined as any)).toThrow(GenericValidationError);
                    expect(() => checkFieldIsString(undefined as any)).toThrow("Input data is invalid, expected a string");
                    expect(() => checkFieldIsString("")).toThrow("Input data is invalid, expected a string");
                });
            });

            describe("Happy Path", () => {
                it("Input is a string, should return true", () => {
                    const isString = checkFieldIsString("Hello World!");
                    expect(isString).toBe(true);
                });

                it("Input is a number, should return false", () => {
                    const isString = checkFieldIsString(9 as any);
                    expect(isString).toBe(false);
                });

                it("Input is a boolean, should return false", () => {
                    const isString = checkFieldIsString(true as any);
                    expect(isString).toBe(false);
                });

                it("Input is an object, should return false", () => {
                    const isString = checkFieldIsString({} as any);
                    expect(isString).toBe(false);
                });

                it("Input is an array, should return false", () => {
                    const isString = checkFieldIsString([] as any);
                    expect(isString).toBe(false);
                });
            });
        });

        describe(`"checkFieldIsNumber" fn`, () => {
            describe("Exception Path", () => {
                it("Input is not defined, should throw an error", () => {
                    expect(() => checkFieldIsNumber(undefined as any)).toThrow(GenericValidationError);
                    expect(() => checkFieldIsNumber(undefined as any)).toThrow("Input data is invalid, expected a number");
                });
            });

            describe("Happy Path", () => {
                it("Input is a number, should return true", () => {
                    const isNumber = checkFieldIsNumber(9);
                    expect(isNumber).toBe(true);
                });

                it("Input is 0, should return true", () => {
                    const isNumber = checkFieldIsNumber(0);
                    expect(isNumber).toBe(true);
                });

                it("Input is a string, should return false", () => {
                    const isNumber = checkFieldIsNumber("Hello World!" as any);
                    expect(isNumber).toBe(false);
                });

                it("Input is a booelan, should return false", () => {
                    const isNumber = checkFieldIsNumber(true as any);
                    expect(isNumber).toBe(false);
                });

                it("Input is an object, should return false", () => {
                    const isNumber = checkFieldIsNumber({} as any);
                    expect(isNumber).toBe(false);
                });

                it("Input is an array, should return false", () => {
                    const isNumber = checkFieldIsNumber([] as any);
                    expect(isNumber).toBe(false);
                });
            });
        });

        describe(`"checkFieldIsBoolean" fn`, () => {
            describe("Exception Path", () => {
                it("Input is not defined, should throw an error", () => {
                    expect(() => checkFieldIsBoolean(undefined as any)).toThrow(GenericValidationError);
                    expect(() => checkFieldIsBoolean(undefined as any)).toThrow("Input data is invalid, expected a boolean");
                });
            });

            describe("Happy Path", () => {
                it("Input is true, should return true", () => {
                    const isBoolean = checkFieldIsBoolean(true);
                    expect(isBoolean).toBe(true);
                });

                it("Input is false, should return true", () => {
                    const isBoolean = checkFieldIsBoolean(false);
                    expect(isBoolean).toBe(true);
                });

                it("Input is a string, should return false", () => {
                    const isBoolean = checkFieldIsBoolean("Hello World!" as any);
                    expect(isBoolean).toBe(false);
                });

                it("Input is a number, should return false", () => {
                    const isBoolean = checkFieldIsBoolean(9 as any);
                    expect(isBoolean).toBe(false);
                });

                it("Input is an object, should return false", () => {
                    const isBoolean = checkFieldIsBoolean({} as any);
                    expect(isBoolean).toBe(false);
                });

                it("Input is an array, should return false", () => {
                    const isBoolean = checkFieldIsBoolean([] as any);
                    expect(isBoolean).toBe(false);
                });
            });
        });

        describe(`"checkFieldIsObject" fn`, () => {
            describe("Exception Path", () => {
                it("Input is not defined, should throw an error", () => {
                    expect(() => checkFieldIsObject(undefined as any)).toThrow(GenericValidationError);
                    expect(() => checkFieldIsObject(undefined as any)).toThrow("Input data is invalid, expected an object");
                });
            });

            describe("Happy Path", () => {
                it("Input is an object, should return true", () => {
                    const isObject = checkFieldIsObject({});
                    expect(isObject).toBe(true);
                });

                it("Input is a string, should return false", () => {
                    const isObject = checkFieldIsObject("Hello World!" as any);
                    expect(isObject).toBe(false);
                });

                it("Input is a number, should return false", () => {
                    const isObject = checkFieldIsObject(9 as any);
                    expect(isObject).toBe(false);
                });

                it("Input is a boolean, should return false", () => {
                    const isObject = checkFieldIsObject(true as any);
                    expect(isObject).toBe(false);
                });

                it("Input is an array, should return false", () => {
                    const isObject = checkFieldIsObject([] as any);
                    expect(isObject).toBe(false);
                });
            });
        });

        describe(`"checkFieldIsArray" fn`, () => {
            describe("Exception Path", () => {
                it("Input is not defined, should throw an error", () => {
                    expect(() => checkFieldIsArray(undefined as any)).toThrow(GenericValidationError);
                    expect(() => checkFieldIsArray(undefined as any)).toThrow("Input data is invalid, expected an array");
                });
            });

            describe("Happy Path", () => {
                it("Input is an array, should return true", () => {
                    const isArray = checkFieldIsArray([]);
                    expect(isArray).toBe(true);
                });

                it("Input is a string, should return false", () => {
                    const isArray = checkFieldIsArray("Hello World!" as any);
                    expect(isArray).toBe(false);
                });

                it("Input is a number, should return false", () => {
                    const isArray = checkFieldIsArray(10 as any);
                    expect(isArray).toBe(false);
                });

                it("Input is a boolean, should return false", () => {
                    const isArray = checkFieldIsArray(true as any);
                    expect(isArray).toBe(false);
                });

                it("Input is an object, should return false", () => {
                    const isArray = checkFieldIsArray({} as any);
                    expect(isArray).toBe(false);
                });
            });
        });
    });
});