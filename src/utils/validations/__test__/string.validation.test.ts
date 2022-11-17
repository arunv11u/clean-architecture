import { GenericValidationError } from "../../errors";
import { allowEmptyStr, checkStrMaxLen, checkStrMinLen, checkValidEmail } from '../string.validation';


describe("Basic Input Validation", () => {
    describe(`"checkStrMaxLen" fn`, () => {
        describe("Exception Path", () => {
            it("Passing undefined as an input data, should throw an error", () => {
                expect(() => checkStrMaxLen(undefined as any, 9)).toThrow(GenericValidationError);
                expect(() => checkStrMaxLen(undefined as any, 9)).toThrow("Input data is invalid, expected a string");
            });

            it("Passing array as an input data, should throw an error", () => {
                expect(() => checkStrMaxLen([] as any, 0)).toThrow(GenericValidationError);
                expect(() => checkStrMaxLen([] as any, 0)).toThrow("Input data is invalid, expected a string");
            });

            it("Passing undefined as an input to maximum limit, should throw an error", () => {
                expect(() => checkStrMaxLen("Hello World!", undefined as any)).toThrow(GenericValidationError);
                expect(() => checkStrMaxLen("Hello World!", undefined as any)).toThrow("Maximum length input is invalid, expected a number");
            });

            it("Passing array as an input to maximum limit, should throw an error", () => {
                expect(() => checkStrMaxLen("Hello World!", [] as any)).toThrow(GenericValidationError);
                expect(() => checkStrMaxLen("Hello World!", [] as any)).toThrow("Maximum length input is invalid, expected a number");
            });
        });

        describe("Happy Path", () => {
            it("Input string length is below the maximum string length, should return true", () => {
                const isMaxValidStr = checkStrMaxLen("Hello", 6);
                expect(isMaxValidStr).toBe(true);
            });

            it("Input string length is same as the maximum string length, should return true", () => {
                const isMaxValidStr = checkStrMaxLen("Hello", 5);
                expect(isMaxValidStr).toBe(true);
            });

            it("Input string length is above the maximum string length, should return false", () => {
                const isMaxValidStr = checkStrMaxLen("Hello There!", 6);
                expect(isMaxValidStr).toBe(false);
            });
        });
    });

    describe(`"checkStrMinLen" fn`, () => {
        describe("Exception Path", () => {
            it("Passing undefined as an input data, should throw an error", () => {
                expect(() => checkStrMinLen(undefined as any, 9)).toThrow(GenericValidationError);
                expect(() => checkStrMinLen(undefined as any, 9)).toThrow("Input data is invalid, expected a string");
            });

            it("Passing array as an input data, should throw an error", () => {
                expect(() => checkStrMinLen([] as any, 0)).toThrow(GenericValidationError);
                expect(() => checkStrMinLen([] as any, 0)).toThrow("Input data is invalid, expected a string");
            });

            it("Passing undefined as an input to minimum limit, should throw an error", () => {
                expect(() => checkStrMinLen("Hello World!", undefined as any)).toThrow(GenericValidationError);
                expect(() => checkStrMinLen("Hello World!", undefined as any)).toThrow("Minimum length input is invalid, expected a number");
            });

            it("Passing array as an input to minimum limit, should throw an error", () => {
                expect(() => checkStrMinLen("Hello World!", [] as any)).toThrow(GenericValidationError);
                expect(() => checkStrMinLen("Hello World!", [] as any)).toThrow("Minimum length input is invalid, expected a number");
            });
        });

        describe("Happy Path", () => {
            it("Input string length is above the minimum string length, should return true", () => {
                const isMinValidStr = checkStrMinLen("Hello", 4);
                expect(isMinValidStr).toBe(true);
            });

            it("Input string length is same as the minimum string length, should return true", () => {
                const isMinValidStr = checkStrMinLen("Hello", 5);
                expect(isMinValidStr).toBe(true);
            });

            it("Input string length is below the minimum string length, should return false", () => {
                const isMinValidStr = checkStrMinLen("Hi", 5);
                expect(isMinValidStr).toBe(false);
            });
        });
    });

    describe(`"checkValidEmail" fn`, () => {
        describe("Exception Path", () => {
            it("Passing undefined as an input data, should throw an error", () => {
                expect(() => checkValidEmail(undefined as any)).toThrow(GenericValidationError);
                expect(() => checkValidEmail(undefined as any)).toThrow("Input data is invalid, expected a string");
            });

            it("Passing array as an input data, should throw an error", () => {
                expect(() => checkValidEmail([] as any)).toThrow(GenericValidationError);
                expect(() => checkValidEmail([] as any)).toThrow("Input data is invalid, expected a string");
            });
        });

        describe("Happy Path", () => {
            it("Input string is valid email address, should return true", () => {
                const isValidEmail = checkValidEmail("test@gmail.com");
                expect(isValidEmail).toBe(true);
            });

            it("Input string is invalid email address, should return false", () => {
                expect(checkValidEmail("test@.com.")).toBe(false);
                expect(checkValidEmail("test@")).toBe(false);
                expect(checkValidEmail("test@gmail.com.")).toBe(false);
                expect(checkValidEmail("test")).toBe(false);
                expect(checkValidEmail("test@gmail")).toBe(false);
                expect(checkValidEmail("TEST@GMAIL>COM")).toBe(false);
            });
        });
    });

    describe(`"allowEmptyStr" fn`, () => {
        describe("Exception Path", () => {
            it("Passing undefined as an input data, should throw an error", () => {
                expect(() => allowEmptyStr(undefined as any)).toThrow(GenericValidationError);
                expect(() => allowEmptyStr(undefined as any)).toThrow("Input data is invalid, expected a string");
            });

            it("Passing array as an input data, should throw an error", () => {
                expect(() => allowEmptyStr([] as any)).toThrow(GenericValidationError);
                expect(() => allowEmptyStr([] as any)).toThrow("Input data is invalid, expected a string");
            });
        });

        describe("Happy Path", () => {
            it("Input is an empty string, should return true", () => {
                expect(allowEmptyStr("")).toBe(true);
            });

            it("Input is a string, should return true", () => {
                expect(allowEmptyStr("Hello World!")).toBe(true);
            });
        });
    })
});
