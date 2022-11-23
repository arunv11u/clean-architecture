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
          // expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow("Name is required");
        });
      });


    });
  });
});
