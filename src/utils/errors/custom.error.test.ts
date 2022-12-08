import { ErrorObject } from "../types";
import { CustomError } from "./custom.error";

class CustomErrorImpl extends CustomError {
    reason = 'Custom Error';
    statusCode = 500;
    constructor() {
        super('Custom Error');

        // Only because extending from a built in class
        Object.setPrototypeOf(this, CustomErrorImpl.prototype);
    };

    serializeErrors(): ErrorObject[] {
        return [{ message: this.reason }];
    };
};

describe("Error Module", () => {
    describe(`"CustomError" class`, () => {
        describe("Happy Path", () => {
            it("Need a class which extended built-in Error class, CustomError class should extend Error class", () => {
                const customError = new CustomErrorImpl();
                
                expect(CustomError.prototype).toBeInstanceOf(Error);
                expect(customError.message).toBe("Custom Error");
            });
        });
    });
});
