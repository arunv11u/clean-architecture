import { GenericValidationError } from "../../errors";
import { checkNumMaxVal, checkNumMinVal } from '../number.validation';


describe("Basic Input Validation", () => {
    describe(`"checkNumMaxVal" fn`, () => {
        describe("Exception Path", () => {
            it("Passing undefined as an input data, should throw an error", () => {
                expect(() => checkNumMaxVal(undefined as any, 9)).toThrow(GenericValidationError);
                expect(() => checkNumMaxVal(undefined as any, 9)).toThrow("Input data is invalid, expected a number");
            });

            it("Passing array as an input data, should throw an error", () => {
                expect(() => checkNumMaxVal([] as any, 0)).toThrow(GenericValidationError);
                expect(() => checkNumMaxVal([] as any, 0)).toThrow("Input data is invalid, expected a number");
            });

            it("Passing undefined as an input to maximum value, should throw an error", () => {
                expect(() => checkNumMaxVal(10, undefined as any)).toThrow(GenericValidationError);
                expect(() => checkNumMaxVal(0, undefined as any)).toThrow("Maximum value input is invalid, expected a number");
            });
        });

        describe("Happy Path", () => {
            it("Input number is below the maximum value, should return true", () => {
                const isValidNum = checkNumMaxVal(10, 20);
                expect(isValidNum).toBe(true);
            });

            it("Input number is same as the maximum value, should return true", () => {
                const isValidNum = checkNumMaxVal(10, 10);
                expect(isValidNum).toBe(true);
            });

            it("Input number is above the maximum value, should return false", () => {
                const isValidNum = checkNumMaxVal(10, 6);
                expect(isValidNum).toBe(false);
            });
        });
    });

    describe(`"checkNumMinVal" fn`, () => {
        describe("Exception Path", () => {
            it("Passing undefined as an input data, should throw an error", () => {
                expect(() => checkNumMinVal(undefined as any, 9)).toThrow(GenericValidationError);
                expect(() => checkNumMinVal(undefined as any, 9)).toThrow("Input data is invalid, expected a number");
            });

            it("Passing array as an input data, should throw an error", () => {
                expect(() => checkNumMinVal([] as any, 0)).toThrow(GenericValidationError);
                expect(() => checkNumMinVal([] as any, 0)).toThrow("Input data is invalid, expected a number");
            });

            it("Passing undefined as an input to minimum value, should throw an error", () => {
                expect(() => checkNumMinVal(10, undefined as any)).toThrow(GenericValidationError);
                expect(() => checkNumMinVal(0, undefined as any)).toThrow("Minimum value input is invalid, expected a number");
            });
        });

        describe("Happy Path", () => {
            it("Input number is above the minimum value, should return true", () => {
                const isValidNum = checkNumMinVal(6, 4);
                expect(isValidNum).toBe(true);
            });

            it("Input number is same as the minimum value, should return true", () => {
                const isValidNum = checkNumMinVal(5, 5);
                expect(isValidNum).toBe(true);
            });

            it("Input number is below the minimum value, should return false", () => {
                const isValidNum = checkNumMinVal(2, 5);
                expect(isValidNum).toBe(false);
            });
        });
    });
});

