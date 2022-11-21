import { NextFunction, Request, Response } from "express";
import { GenericError } from "../errors";
import { GenericErrorObject } from "../types";
import { errorHandler } from "./error-handler.middleware";

describe("Middleware Module", () => {
    describe("Error Handling Middleware", () => {
        let mockRequest: Partial<Request>;
        let mockResponse: Partial<Response>;
        let mockSendMethod: jest.Mock;
        const nextFunction: NextFunction = jest.fn();
        
        beforeEach(() => {
            mockSendMethod = jest.fn();
            mockRequest = {};
            mockResponse = {
                status: jest.fn(() => ({send: mockSendMethod } as any))
            };
        });

        describe("Happy Path", () => {
            it("If error is known to server, should return an understandable error response to the client", () => {
                const _message = "Name is required";
                const _code = 400;
                const mockError: GenericError = new GenericError({error: new Error(_message), errorCode: _code});
                
                errorHandler(mockError, mockRequest as Request, mockResponse as Response, nextFunction);
                expect(mockResponse.status).toBeCalledWith(_code);
                expect(mockSendMethod).toBeCalledWith({errors: [{message: _message}]});
            });

            it(`If error is unknown to server, should return the "Something went wrong error" to the client`, () => {
                const _message = "Something went wrong, please try again";
                const _code = 500;
                const mockError: Error = new Error("Some unknown error");
                
                errorHandler(mockError, mockRequest as Request, mockResponse as Response, nextFunction);
                expect(mockResponse.status).toBeCalledWith(_code);
                expect(mockSendMethod).toBeCalledWith({errors: [{message: _message}]});
            });
        });
    });
});