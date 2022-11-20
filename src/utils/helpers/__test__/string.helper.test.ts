import { GenericError } from "../../errors";
import { trimString } from "../string.helper";

describe("Helper Module", () => {
    describe("String Helper", () => {
        describe(`"trimString" fn`, () => {
            describe("Exception Path", () => {
                it("Passing undefined as an input data, should throw an error", () => {
                    expect(() => trimString(undefined as any)).toThrow(GenericError);
                    expect(() => trimString(undefined as any)).toThrow("Input data is invalid, expected a string");
                });

                it("Passing array as an input data, should throw an error", () => {
                    expect(() => trimString([] as any)).toThrow(GenericError);
                    expect(() => trimString([] as any)).toThrow("Input data is invalid, expected a string");
                });
            });

            describe("Happy Path", () => {
                it("Input string is with spaces in the beginning and end of the string, should return the string without spaces", () => {
                    const trimmedValue = trimString("  Hello  ");
                    expect(trimmedValue).toBe("Hello");
                });
            });
        });
    });
});


