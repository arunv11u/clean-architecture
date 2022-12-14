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

      beforeEach(() => {
        mockResponse = {};
        mockNext = jest.fn();
      });

      describe("Exception Path", () => {
        it("Not requested fields in request, should throw error", () => {
          mockRequest = {
            body: {
              data: faker.random.words(5)
            }
          };

          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(GenericError);
          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow("data is forbidden");
        });

        it("Name not provided, should throw error", () => {
          mockRequest = {
            body: {
              email: faker.internet.email()
            }
          };

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

          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(GenericError);
          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow("Email Address must be a string");
        });

        it("If email is null, should throw error", () => {
          mockRequest = {
            body: {
              name: faker.name.fullName(),
              email: null
            }
          };

          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(GenericError);
          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow("Email Address must be a string");
        });

        it("If email is empty string, should trigger next function", () => {
          mockRequest = {
            body: {
              name: faker.name.fullName(),
              email: ""
            }
          };

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

          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(GenericError);
          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow("Email Address is invalid");
        });

        it(`Not requested fields in "phone" field, should throw error`, () => {
          mockRequest = {
            body: {
              name: faker.name.fullName(),
              phone: {
                data: faker.random.words(5)
              }
            }
          };

          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(GenericError);
          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(`phone.data is forbidden`);
        });

        it("If mobile number is provided and it is empty string, should throw error", () => {
          mockRequest = {
            body: {
              name: faker.name.fullName(),
              phone: ""
            }
          };

          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(GenericError);
          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow("Phone field must be an object");
        });

        it("If mobile number is provided and it is not an object, should throw error", () => {
          mockRequest = {
            body: {
              name: faker.name.fullName(),
              phone: 10
            }
          };

          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(GenericError);
          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow("Phone field must be an object");
        });

        it("If mobile number does not contain code field, should throw error", () => {
          mockRequest = {
            body: {
              name: faker.name.fullName(),
              phone: {
                number: faker.random.numeric(10)
              }
            }
          };

          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(GenericError);
          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow("phone.code is required");
        });

        it("If mobile number does not contain number field, should throw error", () => {
          mockRequest = {
            body: {
              name: faker.name.fullName(),
              phone: {
                code: faker.random.numeric(3)
              }
            }
          };

          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(GenericError);
          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow("phone.number is required");
        });

        it(`If mobile number is less than ${mobileNumberMinLen} character, should throw error`, () => {
          const phoneCode = "+91";
          mockRequest = {
            body: {
              name: faker.name.fullName(),
              phone: {
                code: phoneCode,
                number: faker.random.numeric(mobileNumberMinLen - phoneCode.length - 1)
              }
            }
          };

          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(GenericError);
          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(`Mobile Number should be minimum ${mobileNumberMinLen} characters`);
        });

        it("If mobile number is provided and its code is not a string, should throw error", () => {
          mockRequest = {
            body: {
              name: faker.name.fullName(),
              phone: {
                code: 789,
                number: faker.random.numeric(10)
              }
            }
          };

          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(GenericError);
          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow("phone.code must be a string");
        });

        it("If mobile number is provided and its number is not a string, should throw error", () => {
          mockRequest = {
            body: {
              name: faker.name.fullName(),
              phone: {
                code: faker.random.numeric(3),
                number: parseInt(faker.random.numeric(10))
              }
            }
          };

          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(GenericError);
          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow("phone.number must be a string");
        });

        it(`If mobile number is greater than ${mobileNumberMaxLen} characters, should throw error`, () => {
          const phoneCode = "+91";
          mockRequest = {
            body: {
              name: faker.name.fullName(),
              phone: {
                code: phoneCode,
                number: faker.random.numeric((mobileNumberMaxLen - phoneCode.length) + 1)
              }
            }
          };

          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(GenericError);
          expect(() => guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext)).toThrow(`Mobile Number should not exceeds ${mobileNumberMaxLen} characters`);
        });

        it(`If mobile number has invalid characters, should throw error`, () => {
          const phoneCode = "+91";
          mockRequest = {
            body: {
              name: faker.name.fullName(),
              phone: {
                code: phoneCode,
                number: "+91987654321a"
              }
            }
          };

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
              phone: {
                code: "+91",
                number: "9876543210"
              }
            }
          };

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

          guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext);
          expect(mockNext).toHaveBeenCalled();
        });

        it("Valid values are provided, should trigger next function", () => {
          mockRequest = {
            body: {
              name: faker.name.fullName()
            }
          };

          guestLoginValidator(mockRequest as Request, mockResponse as Response, mockNext);
          expect(mockNext).toHaveBeenCalled();
        });
      });
    });
  });
});
