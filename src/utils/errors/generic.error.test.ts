import { CustomError } from "./custom.error";
import { GenericError } from "./generic.error";



describe("Error Module", () => {
    describe(`"GenericError" class`, () => {
        describe("Happy Path", () => {
            it("Need a class which extended built-in CustomError class, GenericError class should extend CustomError class", () => {
                expect(GenericError.prototype).toBeInstanceOf(CustomError);
            });

            it("Generic Error Object should be an instance of a Custom Error", () => {
                const genericError = new GenericError({ error: new Error("Something went wrong!"), errorCode: 500 });
                expect(genericError).toBeInstanceOf(CustomError);
            });
        });
    });

    describe(`"serializeErrors" fn`, () => {
        describe("Happy Path", () => {
            it("No arguments passed, should return structured error message", () => {
                const _message = "Something went wrong!";
                const genericError = new GenericError({ error: new Error(_message), errorCode: 500 });
                const _errorMessage = genericError.serializeErrors();

                expect(_errorMessage).toMatchObject([{ message: _message }]);
                expect(genericError.message).toBe(_message);
            });
        });
    });
});
