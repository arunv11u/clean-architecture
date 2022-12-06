import { faker } from "@faker-js/faker";
import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../utils";
import mockAuthRepositoryImpl, { mockGuestLogin } from "../repositories/__mocks__/auth.repository.mock";
import { AuthServiceImpl } from "./auth.service";

jest.mock("../repositories/auth.repository", () => {
  return {
    AuthRepositoryImpl: mockAuthRepositoryImpl
  };
});

describe("Auth Component", () => {
  let authService: AuthService;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const mockNextFunction: jest.Mock = jest.fn();

  beforeEach(() => {
    authService = new AuthServiceImpl();
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
    mockResponse = {};
  });

  afterEach(() => {
    mockGuestLogin.mockReset();
  });
  describe("Service Module", () => {

    describe(`"guestLogin" method`, () => {

      describe("Exception Path", () => {
        it("If error occurs, should abort transaction and end session and throw the error back to the controller", async () => {
          const error = new Error("Something went wrong!");
          mockGuestLogin.mockImplementation(() => { throw error });

          await expect(() => authService.guestLogin(mockRequest as Request, mockResponse as Response, mockNextFunction)).rejects.toThrow(error);
        });
      });

      describe("Happy Path", () => {
        it("If guest login request made, should save the user, and return the user details", async () => {
          await authService.guestLogin(mockRequest as Request, mockResponse as Response, mockNextFunction);

          expect(mockAuthRepositoryImpl).toHaveBeenCalled();
          expect(mockGuestLogin).toHaveBeenCalled();
        });
      });
    });
  });
});
