import { Request } from 'express';
import { corsOptions } from "./cors";
import { Environment } from './types';


describe("Config Module", () => {
    describe(`"corsOptions" fn`, () => {

        describe("Exception Path", () => {
            it("No input passed and the provided domain is not whitelisted, should throw an error", () => {
                const mockRequest: Partial<Request> = {};
                const mockCallback: jest.Mock = jest.fn((error, corsOptions) => {
                    corsOptions.origin("http://localhost:4201", (error: Error, result: boolean) => {
                        expect(error).toBeInstanceOf(Error);
                        expect(error).toStrictEqual(new Error("Not allowed by CORS"));
                    });
                });

                const isCorsSet = corsOptions(mockRequest, mockCallback);
                expect(isCorsSet).toBe(true);
            });
        });

        describe("Happy Path", () => {
            it("No input passed in test environment, should set cors and return true", () => {
                const mockRequest: Partial<Request> = {};
                const mockCallback: jest.Mock = jest.fn((error, corsOptions) => {
                    corsOptions.origin("http://localhost:4200", (error: Error, result: boolean) => {
                        expect(result).toBe(true);
                    });
                });

                const isCorsSet = corsOptions(mockRequest, mockCallback);
                expect(isCorsSet).toBe(true);
            });

            it("No input passed in production environment, should set cors and return true", () => {
                process.env.NODE_ENV = Environment.PRODUCTION;

                const mockRequest: Partial<Request> = {};
                const mockCallback: jest.Mock = jest.fn();

                const isCorsSet = corsOptions(mockRequest, mockCallback);
                expect(isCorsSet).toBe(true);
            });

            it("No input passed in staging environment, should set cors and return true", () => {
                process.env.NODE_ENV = Environment.STAGING;

                const mockRequest: Partial<Request> = {};
                const mockCallback: jest.Mock = jest.fn();

                const isCorsSet = corsOptions(mockRequest, mockCallback);
                expect(isCorsSet).toBe(true);
            });

            it("No input passed in dev environment, should set cors and return true", () => {
                process.env.NODE_ENV = Environment.DEV;

                const mockRequest: Partial<Request> = {};
                const mockCallback: jest.Mock = jest.fn((error, corsOptions) => {
                    corsOptions.origin("http://localhost:4200", (error: Error, result: boolean) => {
                        expect(result).toBe(true);
                    });
                });

                const isCorsSet = corsOptions(mockRequest, mockCallback);
                expect(isCorsSet).toBe(true);
            });
        });
    });
});
