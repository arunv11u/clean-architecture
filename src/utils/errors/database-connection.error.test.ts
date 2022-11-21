import { CustomError } from "./custom.error";
import { DatabaseConnectionError } from "./database-connection.error";



describe("Error Module", () => {
    describe(`"DatabaseConnectionError" class`, () => {
        describe("Happy Path", () => {
            it("Need a class which extended built-in CustomError class, DatabaseConnectionError class should extend CustomError class", () => {
                expect(DatabaseConnectionError.prototype).toBeInstanceOf(CustomError);
            });

            it("Database Connection Error Object should be an instance of a Custom Error", () => {
                const databaseConnectionError = new DatabaseConnectionError();
                expect(databaseConnectionError).toBeInstanceOf(CustomError);
            });
        });
    });

    describe(`"serializeErrors" fn`, () => {
        describe("Happy Path", () => {
            it("No arguments passed, should return structured error message", () => {
                const databaseConnectionError = new DatabaseConnectionError();
                const _errorMessage = databaseConnectionError.serializeErrors();

                const _message = "Error, connecting to the database";
                expect(_errorMessage).toMatchObject([{ message: _message }]);
                expect(databaseConnectionError.message).toBe(_message);
            });
        });
    });
});
