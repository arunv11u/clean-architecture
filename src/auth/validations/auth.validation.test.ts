import { Request, Response, NextFunction } from 'express';
import { faker } from "@faker-js/faker";
import { GenericError } from "../../utils";
import { AuthValidationImpl } from "./auth.validation";

describe("Auth Component", () => {
  describe("Validation Module", () => {
    const authValidation = new AuthValidationImpl();
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: NextFunction;

    describe(`"guestLogin" method`, () => {
      const guestLoginValidator = authValidation.guestLogin();
      const nameMinLen = 1;
      const nameMaxLen = 50;
      const emailMinLen = 5;
      const emailMaxLen = 50;
      const mobileNumberMinLen = 8;
      const mobileNumberMaxLen = 16;

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

        it(`If name is less than ${nameMinLen} character, should throw error`, () => {
          mockRequest = {
            body: {
              name: "",
              email: faker.internet.email()
            }
          };
          mockResponse = {};
          mockNext = jest.fn();

          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(GenericError);
          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(`Name should be minimum ${nameMinLen} character`);
        });

        it(`If name is greater than ${nameMaxLen} characters, should throw error`, () => {
          mockRequest = {
            body: {
              name: faker.random.alpha(nameMaxLen + 1),
              email: faker.internet.email()
            }
          };
          mockResponse = {};
          mockNext = jest.fn();

          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(GenericError);
          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(`Name should not exceeds ${nameMaxLen} characters`);
        });

        it("If email is provided and it is not a string, should throw error", () => {
          mockRequest = {
            body: {
              name: faker.name.fullName(),
              email: []
            }
          };
          mockResponse = {};
          mockNext = jest.fn();

          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(GenericError);
          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow("Email Address must be a string");
        });

        it(`If email is less than ${emailMinLen} character, should throw error`, () => {
          mockRequest = {
            body: {
              name: faker.name.fullName(),
              email: "a@g."
            }
          };
          mockResponse = {};
          mockNext = jest.fn();

          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(GenericError);
          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(`Email Address should be minimum ${emailMinLen} characters`);
        });

        it(`If email is greater than ${emailMaxLen} characters, should throw error`, () => {
          mockRequest = {
            body: {
              name: faker.name.fullName(),
              email: faker.random.alpha(emailMaxLen + 1)
            }
          };
          mockResponse = {};
          mockNext = jest.fn();

          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(GenericError);
          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(`Email Address should not exceeds ${emailMaxLen} characters`);
        });

        it("If email is provided and it is invalid, should throw error", () => {
          mockRequest = {
            body: {
              name: faker.name.fullName(),
              email: "test@gmail"
            }
          };
          mockResponse = {};
          mockNext = jest.fn();

          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(GenericError);
          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow("Email Address is invalid");
        });

        it("If mobile number is provided and it is not a string, should throw error", () => {
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

        it(`If mobile number is less than ${mobileNumberMinLen} character, should throw error`, () => {
          mockRequest = {
            body: {
              name: faker.name.fullName(),
              mobileNumber: "1234567"
            }
          };
          mockResponse = {};
          mockNext = jest.fn();

          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(GenericError);
          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(`Mobile Number should be minimum ${mobileNumberMinLen} characters`);
        });

        it(`If mobile number is greater than ${mobileNumberMaxLen} characters, should throw error`, () => {
          mockRequest = {
            body: {
              name: faker.name.fullName(),
              mobileNumber: faker.random.numeric(mobileNumberMaxLen + 1),
            }
          };
          mockResponse = {};
          mockNext = jest.fn();

          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(GenericError);
          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(`Mobile Number should not exceeds ${mobileNumberMaxLen} characters`);
        });

        it(`If mobile number has invalid characters, should throw error`, () => {
          mockRequest = {
            body: {
              name: faker.name.fullName(),
              mobileNumber: "+91987654321a",
            }
          };
          mockResponse = {};
          mockNext = jest.fn();

          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(GenericError);
          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow("Mobile Number is invalid");
        });

      });

      describe("Happy Path", () => {
        it("Valid values are provided, should trigger next function", () => {
          mockRequest = {
            body: {
              name: faker.name.fullName(),
              email: faker.internet.email(),
              mobileNumber: "+919876543210"
            }
          };
          mockResponse = {};
          mockNext = jest.fn();

          guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext);
          expect(mockNext).toHaveBeenCalled();
        });

        it("Valid values are provided, should trigger next function", () => {
          mockRequest = {
            body: {
              name: faker.name.fullName(),
              email: faker.internet.email()
            }
          };
          mockResponse = {};
          mockNext = jest.fn();

          guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext);
          expect(mockNext).toHaveBeenCalled();
        });

        it("Valid values are provided, should trigger next function", () => {
          mockRequest = {
            body: {
              name: faker.name.fullName()
            }
          };
          mockResponse = {};
          mockNext = jest.fn();

          guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext);
          expect(mockNext).toHaveBeenCalled();
        });
      });
    });
  });
});
