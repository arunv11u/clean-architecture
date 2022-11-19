import { allowFields, allowUndefinedField, checkFieldExist } from '../object.validation';
import { GenericError } from '../../errors';

describe("Basic Input Validation", () => {
    describe(`"checkFieldExist" fn`, () => {
        describe("Exception Path", () => {
            it("Passing array as an input, should throw an error", () => {
                expect(() => checkFieldExist([{ test: "value" }], "someField")).toThrow(GenericError);
                expect(() => checkFieldExist([{ test: "value" }], "someField")).toThrow("Input data is invalid, expected an object");
            });
        });

        describe("Happy Path", () => {
            it("Passing the existing field as an input, should return true", () => {
                const isExist = checkFieldExist({ "car": "honda", "bike": "hero" }, "car");
                expect(isExist).toBe(true);
            });

            it("Passing the non existing field as an input, should return false", () => {
                const isExist = checkFieldExist({ "car": "honda", "bike": "hero" }, "van");
                expect(isExist).toBe(false);
            });
        })
    });

    describe(`"allowUndefinedField" fn`, () => {
        describe("Happy Path", () => {
            it("Passing undefined as an input, should return true", () => {
                expect(allowUndefinedField(undefined)).toBe(true);
            });

            it("Passing other than undefined as an input, should return false", () => {
                expect(allowUndefinedField("Hello World!")).toBe(false);
                expect(allowUndefinedField(1)).toBe(false);
                expect(allowUndefinedField(true)).toBe(false);
                expect(allowUndefinedField({})).toBe(false);
                expect(allowUndefinedField([])).toBe(false);
                expect(allowUndefinedField("")).toBe(false);
                expect(allowUndefinedField(0)).toBe(false);
                expect(allowUndefinedField(false)).toBe(false);
            });
        });
    });

    describe(`"allowFields" fn`, () => {
        describe("Exception Path", () => {
            it("Passing undefined as an input data, should throw an error", () => {
                expect(() => allowFields(undefined as any, [])).toThrow(GenericError);
                expect(() => allowFields(undefined as any, [])).toThrow("Input data is invalid, expected an object");
            });

            it("Passing array as an input data, should throw an error", () => {
                expect(() => allowFields([] as any, [])).toThrow(GenericError);
                expect(() => allowFields([] as any, [])).toThrow("Input data is invalid, expected an object");
            });

            it("Passing undefined for fields input, should throw an error", () => {
                expect(() => allowFields({}, undefined as any)).toThrow(GenericError);
                expect(() => allowFields({}, undefined as any)).toThrow("Fields input is invalid, expected an array of strings");
            });

            it("Passing other than array of strings for fields input, should throw an error", () => {
                expect(() => allowFields({}, [9 as any, 10 as any])).toThrow(GenericError);
                expect(() => allowFields({}, [9 as any, 10 as any])).toThrow("Fields input is invalid, expected an array of strings");
                expect(() => allowFields({}, [{} as any, {} as any])).toThrow("Fields input is invalid, expected an array of strings");
                expect(() => allowFields({}, [{} as any, {} as any])).toThrow("Fields input is invalid, expected an array of strings");
                expect(() => allowFields({}, [true as any, false as any])).toThrow("Fields input is invalid, expected an array of strings");
                expect(() => allowFields({}, [true as any, false as any])).toThrow("Fields input is invalid, expected an array of strings");
            });
        });

        describe("Happy Path", () => {
            it("Passing valid input data and fields, should return true", () => {
                expect(allowFields({ "car": "honda", "bike": "Hero" }, ["car", "bike"])).toBe(true);
            });

            it("Passing extra fields to an input data, should return false", () => {
                expect(allowFields({ "car": "honda", "bike": "Hero" }, ["car"])).toBe(false);
            });
        });
    });
});
