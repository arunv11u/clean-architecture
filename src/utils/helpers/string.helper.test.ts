import { GenericError } from "../errors";
import { StringHelper } from "./string.helper";

describe("Helper Module", () => {
    describe("String Helper", () => {
        const stringHelper = StringHelper.getInstance();
        describe(`"trimString" fn`, () => {
            describe("Exception Path", () => {
                it("Passing undefined as an input data, should throw an error", () => {
                    expect(() => stringHelper.trimString(undefined as any)).toThrow(GenericError);
                    expect(() => stringHelper.trimString(undefined as any)).toThrow("Input data is invalid, expected a string");
                });

                it("Passing array as an input data, should throw an error", () => {
                    expect(() => stringHelper.trimString([] as any)).toThrow(GenericError);
                    expect(() => stringHelper.trimString([] as any)).toThrow("Input data is invalid, expected a string");
                });
            });

            describe("Happy Path", () => {
                it("Input string is with spaces in the beginning and end of the string, should return the string without spaces", () => {
                    const trimmedValue = stringHelper.trimString("  Hello  ");
                    expect(trimmedValue).toBe("Hello");
                });
            });
        });

        describe(`"camelToTitleCase"`, () => {
            describe("Exception Path", () => {
                it("Passing undefined as an input data, should throw an error", () => {
                    expect(() => stringHelper.camelToTitleCase(undefined as any)).toThrow(GenericError);
                    expect(() => stringHelper.camelToTitleCase(undefined as any)).toThrow("Input data is invalid, expected a string");
                });

                it("Passing array as an input data, should throw an error", () => {
                    expect(() => stringHelper.camelToTitleCase([] as any)).toThrow(GenericError);
                    expect(() => stringHelper.camelToTitleCase([] as any)).toThrow("Input data is invalid, expected a string");
                });
            });

            describe("Happy Path", () => {
                it("Input string is in camel case, should return the title case", () => {
                    const formattedStr = stringHelper.camelToTitleCase("firstName");
                    expect(formattedStr).toBe("First Name");
                });
            });
        });
    });
});


