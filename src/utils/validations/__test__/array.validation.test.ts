import { GenericError } from "../../errors";
import { checkArrMaxLen, checkArrMinLen, checkArrOfBool, checkArrOfNum, checkArrOfStr } from '../array.validation';


describe("Basic Input Validation", () => {
    describe(`"checkArrMaxLen" fn`, () => {
        describe("Exception Path", () => {
            it("Passing undefined as an input data, should throw an error", () => {
                expect(() => checkArrMaxLen(undefined as any, 9)).toThrow(GenericError);
                expect(() => checkArrMaxLen(undefined as any, 9)).toThrow("Input data is invalid, expected an array");
            });

            it("Passing object as an input data, should throw an error", () => {
                expect(() => checkArrMaxLen({} as any, 0)).toThrow(GenericError);
                expect(() => checkArrMaxLen({} as any, 0)).toThrow("Input data is invalid, expected an array");
            });

            it("Passing undefined as an input to maximum limit, should throw an error", () => {
                expect(() => checkArrMaxLen([], undefined as any)).toThrow(GenericError);
                expect(() => checkArrMaxLen([], undefined as any)).toThrow("Maximum length input is invalid, expected a number");
            });

            it("Passing array as an input to maximum limit, should throw an error", () => {
                expect(() => checkArrMaxLen([], [] as any)).toThrow(GenericError);
                expect(() => checkArrMaxLen([], [] as any)).toThrow("Maximum length input is invalid, expected a number");
            });
        });

        describe("Happy Path", () => {
            it("Input array length is below the maximum length, should return true", () => {
                const isValidArr = checkArrMaxLen([4], 6);
                expect(isValidArr).toBe(true);
            });

            it("Input array length is same as the maximum length, should return true", () => {
                const isValidArr = checkArrMaxLen([4, 5], 2);
                expect(isValidArr).toBe(true);
            });

            it("Input array length is above the maximum length, should return false", () => {
                const isValidArr = checkArrMaxLen([4, 5, 6], 2);
                expect(isValidArr).toBe(false);
            });
        });
    });

    describe(`"checkArrMinLen" fn`, () => {
        describe("Exception Path", () => {
            it("Passing undefined as an input data, should throw an error", () => {
                expect(() => checkArrMinLen(undefined as any, 9)).toThrow(GenericError);
                expect(() => checkArrMinLen(undefined as any, 9)).toThrow("Input data is invalid, expected an array");
            });

            it("Passing object as an input data, should throw an error", () => {
                expect(() => checkArrMinLen({} as any, 0)).toThrow(GenericError);
                expect(() => checkArrMinLen({} as any, 0)).toThrow("Input data is invalid, expected an array");
            });

            it("Passing undefined as an input to minimum length, should throw an error", () => {
                expect(() => checkArrMinLen([], undefined as any)).toThrow(GenericError);
                expect(() => checkArrMinLen([], undefined as any)).toThrow("Minimum length input is invalid, expected a number");
            });

            it("Passing array as an input to minimum length, should throw an error", () => {
                expect(() => checkArrMinLen([], [] as any)).toThrow(GenericError);
                expect(() => checkArrMinLen([], [] as any)).toThrow("Minimum length input is invalid, expected a number");
            });
        });

        describe("Happy Path", () => {
            it("Input array length is above the minimum length, should return true", () => {
                const isValidArr = checkArrMinLen([2, 3, 4], 2);
                expect(isValidArr).toBe(true);
            });

            it("Input array length is same as the minimum length, should return true", () => {
                const isValidArr = checkArrMinLen([2, 3], 2);
                expect(isValidArr).toBe(true);
            });

            it("Input array length is below the minimum length, should return false", () => {
                const isValidArr = checkArrMinLen([2, 3], 5);
                expect(isValidArr).toBe(false);
            });
        });
    });

    describe(`"checkArrOfStr" fn`, () => {
        describe("Exception Path", () => {
            it("Passing undefined as an input data, should throw an error", () => {
                expect(() => checkArrOfStr(undefined as any)).toThrow(GenericError);
                expect(() => checkArrOfStr(undefined as any)).toThrow("Input data is invalid, expected an array of strings");
            });

            it("Passing array of numbers as an input data, should throw an error", () => {
                expect(() => checkArrOfStr([9 as any])).toThrow(GenericError);
                expect(() => checkArrOfStr([10 as any])).toThrow("Input data is invalid, expected an array of strings");
            });
        });

        describe("Happy Path", () => {
            it("Passing array of strings as an input data, should return true", () => {
                expect(checkArrOfStr(["data", "car"])).toBe(true);
            });
        });
    });

    describe(`"checkArrOfNum" fn`, () => {
        describe("Exception Path", () => {
            it("Passing undefined as an input data, should throw an error", () => {
                expect(() => checkArrOfNum(undefined as any)).toThrow(GenericError);
                expect(() => checkArrOfNum(undefined as any)).toThrow("Input data is invalid, expected an array of numbers");
            });

            it("Passing array of strings as an input data, should throw an error", () => {
                expect(() => checkArrOfNum(["data" as any])).toThrow(GenericError);
                expect(() => checkArrOfNum(["data" as any])).toThrow("Input data is invalid, expected an array of numbers");
            });
        });

        describe("Happy Path", () => {
            it("Passing array of numbers as an input data, should return true", () => {
                expect(checkArrOfNum([3, 4])).toBe(true);
            });
        });
    });

    describe(`"checkArrOfBool" fn`, () => {
        describe("Exception Path", () => {
            it("Passing undefined as an input data, should throw an error", () => {
                expect(() => checkArrOfBool(undefined as any)).toThrow(GenericError);
                expect(() => checkArrOfBool(undefined as any)).toThrow("Input data is invalid, expected an array of booleans");
            });

            it("Passing array of numbers as an input data, should throw an error", () => {
                expect(() => checkArrOfBool([9 as any])).toThrow(GenericError);
                expect(() => checkArrOfBool([9 as any])).toThrow("Input data is invalid, expected an array of booleans");
            });
        });

        describe("Happy Path", () => {
            it("Passing array of booleans as an input data, should return true", () => {
                expect(checkArrOfBool([true, false, true])).toBe(true);
            });
        });
    });

});
