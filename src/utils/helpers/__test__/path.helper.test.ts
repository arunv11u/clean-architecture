import { GenericError } from "../../errors";
import { mergePath } from "../path.helper";


describe("Helper Module", () => {
    describe("Path Helper", () => {
        describe(`"mergePath" fn`, () => {
            describe("Exception Path", () => {
                it("Passing undefined as an input data, should throw an error", () => {
                    expect(() => mergePath(undefined as any)).toThrow(GenericError);
                    expect(() => mergePath(undefined as any)).toThrow("Input data is invalid, expected an array of strings");
                });

                it("Passing object as an input data, should throw an error", () => {
                    expect(() => mergePath({} as any)).toThrow(GenericError);
                    expect(() => mergePath({} as any)).toThrow("Input data is invalid, expected an array of strings");
                });

                it("Passing array of object as an input data, should throw an error", () => {
                    expect(() => mergePath([{}] as any)).toThrow(GenericError);
                    expect(() => mergePath([{}] as any)).toThrow("Input data is invalid, expected an array of strings");
                });

            });
        });
    });
});
