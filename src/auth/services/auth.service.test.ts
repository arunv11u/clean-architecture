import { faker } from "@faker-js/faker";
import { Request, Response, NextFunction } from "express";
import mockAuthRepositoryImpl, { mockGuestLogin } from "../repositories/__mocks__/auth.repository";
import { AuthServiceImpl } from "./auth.service";

jest.mock("../repositories/auth.repository.ts", () => {
  return {
    AuthRepositoryImpl: mockAuthRepositoryImpl
  };
});

describe("Auth Component", () => {
  describe("Service Module", () => {
    const authService = new AuthServiceImpl();
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    const mockNextFunction: NextFunction = jest.fn();

    describe(`"guestLogin" method`, () => {
      beforeEach(() => {
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

      describe("Happy Path", () => {
        it("If guest login request made, should save the user, token and return the token", async () => {
          await authService.guestLogin(mockRequest as Request, mockResponse as Response, mockNextFunction);

          expect(mockAuthRepositoryImpl).toHaveBeenCalled();
          expect(mockGuestLogin).toHaveBeenCalled();
        });
      });
    });
  });
});
