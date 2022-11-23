import { GenericError } from "../errors";
import { StringValidation } from "./string.validation";

describe("Basic Input Validation", () => {
  const stringValidation = StringValidation.getInstance();

  describe(`"String Validation" class`, () => {
    describe(`"checkStrMaxLen" method`, () => {
      describe("Exception Path", () => {
        it("Passing undefined as an input data, should throw an error", () => {
          expect(() =>
            stringValidation.checkStrMaxLen(undefined as any, 9)
          ).toThrow(GenericError);
          expect(() =>
            stringValidation.checkStrMaxLen(undefined as any, 9)
          ).toThrow("Input data is invalid, expected a string");
        });

        it("Passing array as an input data, should throw an error", () => {
          expect(() => stringValidation.checkStrMaxLen([] as any, 0)).toThrow(
            GenericError
          );
          expect(() => stringValidation.checkStrMaxLen([] as any, 0)).toThrow(
            "Input data is invalid, expected a string"
          );
        });

        it("Passing undefined as an input to maximum limit, should throw an error", () => {
          expect(() =>
            stringValidation.checkStrMaxLen("Hello World!", undefined as any)
          ).toThrow(GenericError);
          expect(() =>
            stringValidation.checkStrMaxLen("Hello World!", undefined as any)
          ).toThrow("Maximum length input is invalid, expected a number");
        });

        it("Passing array as an input to maximum limit, should throw an error", () => {
          expect(() =>
            stringValidation.checkStrMaxLen("Hello World!", [] as any)
          ).toThrow(GenericError);
          expect(() =>
            stringValidation.checkStrMaxLen("Hello World!", [] as any)
          ).toThrow("Maximum length input is invalid, expected a number");
        });
      });

      describe("Happy Path", () => {
        it("Input string length is below the maximum string length, should return true", () => {
          const isMaxValidStr = stringValidation.checkStrMaxLen("Hello", 6);
          expect(isMaxValidStr).toBe(true);
        });

        it("Input string length is same as the maximum string length, should return true", () => {
          const isMaxValidStr = stringValidation.checkStrMaxLen("Hello", 5);
          expect(isMaxValidStr).toBe(true);
        });

        it("Input string length is above the maximum string length, should return false", () => {
          const isMaxValidStr = stringValidation.checkStrMaxLen(
            "Hello There!",
            6
          );
          expect(isMaxValidStr).toBe(false);
        });
      });
    });

    describe(`"checkStrMinLen" method`, () => {
      describe("Exception Path", () => {
        it("Passing undefined as an input data, should throw an error", () => {
          expect(() =>
            stringValidation.checkStrMinLen(undefined as any, 9)
          ).toThrow(GenericError);
          expect(() =>
            stringValidation.checkStrMinLen(undefined as any, 9)
          ).toThrow("Input data is invalid, expected a string");
        });

        it("Passing array as an input data, should throw an error", () => {
          expect(() => stringValidation.checkStrMinLen([] as any, 0)).toThrow(
            GenericError
          );
          expect(() => stringValidation.checkStrMinLen([] as any, 0)).toThrow(
            "Input data is invalid, expected a string"
          );
        });

        it("Passing undefined as an input to minimum limit, should throw an error", () => {
          expect(() =>
            stringValidation.checkStrMinLen("Hello World!", undefined as any)
          ).toThrow(GenericError);
          expect(() =>
            stringValidation.checkStrMinLen("Hello World!", undefined as any)
          ).toThrow("Minimum length input is invalid, expected a number");
        });

        it("Passing array as an input to minimum limit, should throw an error", () => {
          expect(() =>
            stringValidation.checkStrMinLen("Hello World!", [] as any)
          ).toThrow(GenericError);
          expect(() =>
            stringValidation.checkStrMinLen("Hello World!", [] as any)
          ).toThrow("Minimum length input is invalid, expected a number");
        });
      });

      describe("Happy Path", () => {
        it("Input string length is above the minimum string length, should return true", () => {
          const isMinValidStr = stringValidation.checkStrMinLen("Hello", 4);
          expect(isMinValidStr).toBe(true);
        });

        it("Input string length is same as the minimum string length, should return true", () => {
          const isMinValidStr = stringValidation.checkStrMinLen("Hello", 5);
          expect(isMinValidStr).toBe(true);
        });

        it("Input string length is below the minimum string length, should return false", () => {
          const isMinValidStr = stringValidation.checkStrMinLen("Hi", 5);
          expect(isMinValidStr).toBe(false);
        });
      });
    });

    describe(`"checkValidEmail" method`, () => {
      describe("Exception Path", () => {
        it("Passing undefined as an input data, should throw an error", () => {
          expect(() =>
            stringValidation.checkValidEmail(undefined as any)
          ).toThrow(GenericError);
          expect(() =>
            stringValidation.checkValidEmail(undefined as any)
          ).toThrow("Input data is invalid, expected a string");
        });

        it("Passing array as an input data, should throw an error", () => {
          expect(() => stringValidation.checkValidEmail([] as any)).toThrow(
            GenericError
          );
          expect(() => stringValidation.checkValidEmail([] as any)).toThrow(
            "Input data is invalid, expected a string"
          );
        });
      });

      describe("Happy Path", () => {
        it("Input string is valid email address, should return true", () => {
          const isValidEmail =
            stringValidation.checkValidEmail("test@gmail.com");
          expect(isValidEmail).toBe(true);
        });

        it("Input string is invalid email address, should return false", () => {
          expect(stringValidation.checkValidEmail("test@.com.")).toBe(false);
          expect(stringValidation.checkValidEmail("test@")).toBe(false);
          expect(stringValidation.checkValidEmail("test@gmail.com.")).toBe(
            false
          );
          expect(stringValidation.checkValidEmail("test")).toBe(false);
          expect(stringValidation.checkValidEmail("test@gmail")).toBe(false);
          expect(stringValidation.checkValidEmail("TEST@GMAIL>COM")).toBe(
            false
          );
        });
      });
    });

    describe(`"allowEmptyStr" method`, () => {
      describe("Exception Path", () => {
        it("Passing undefined as an input data, should throw an error", () => {
          expect(() =>
            stringValidation.allowEmptyStr(undefined as any)
          ).toThrow(GenericError);
          expect(() =>
            stringValidation.allowEmptyStr(undefined as any)
          ).toThrow("Input data is invalid, expected a string");
        });

        it("Passing array as an input data, should throw an error", () => {
          expect(() => stringValidation.allowEmptyStr([] as any)).toThrow(
            GenericError
          );
          expect(() => stringValidation.allowEmptyStr([] as any)).toThrow(
            "Input data is invalid, expected a string"
          );
        });
      });

      describe("Happy Path", () => {
        it("Input is an empty string, should return true", () => {
          expect(stringValidation.allowEmptyStr("")).toBe(true);
        });

        it("Input is a string, should return true", () => {
          expect(stringValidation.allowEmptyStr("Hello World!")).toBe(true);
        });
      });
    });
  });
});
