import { CustomError } from "./custom.error";


describe("Error Module", () => {
    describe(`"CustomError" class`, () => {
        describe("Happy Path", () => {
            it("Need a class which extended built-in Error class, CustomError class should extend Error class", () => {
                expect(CustomError.prototype).toBeInstanceOf(Error);
            });
        });
    });
});
