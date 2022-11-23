import { Request, Response, NextFunction } from 'express';
import { faker } from "@faker-js/faker";
import { AuthValidation } from "./auth.validation";
import { GenericError } from "../../utils";

describe("Auth Component", () => {
  describe("Validation Module", () => {
    const authValidation = AuthValidation.getInstance();
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: NextFunction;

    describe(`"guestLogin" method`, () => {
      const guestLoginValidator = authValidation.guestLogin();

      describe("Exception Path", () => {
        it("Not requested fields in request, should throw error", () => {
          mockRequest = {
            body: {
              data: faker.random.words(5)
            }
          };
          mockResponse = {};
          mockNext = jest.fn();

          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(GenericError);
          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow("data is forbidden");
        });

        it("Name not provided, should throw error", () => {
          mockRequest = {
            body: {
              email: faker.internet.email()
            }
          };
          mockResponse = {};
          mockNext = jest.fn();

          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(GenericError);
          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow("Name is required");
        });

        it("If email is provided and it is not a sting, should throw error", () => {
          mockRequest = {
            body: {
              name: faker.name.fullName(),
              email: []
            }
          };
          mockResponse = {};
          mockNext = jest.fn();

          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(GenericError);
          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow("Email must be a string");
        });

        it("If email is provided and its invalid, should throw error", () => {
          mockRequest = {
            body: {
              name: faker.name.fullName(),
              email: "test@gmail"
            }
          };
          mockResponse = {};
          mockNext = jest.fn();

          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(GenericError);
          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow("Email is invalid");
        });

        describe("If mobile number is provided and it is not a string, should throw error", () => {
          mockRequest = {
            body: {
              name: faker.name.fullName(),
              mobileNumber: 10
            }
          };
          mockResponse = {};
          mockNext = jest.fn();

          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(GenericError);
          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow("Mobile Number must be a string");
        });

      });


    });
  });
});
