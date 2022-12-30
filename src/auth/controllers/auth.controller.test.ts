import { Request, Response, NextFunction } from "express";
import mockResponseHandlerImpl, { mockOk } from "../../utils/__mocks__/response-handler.mock";
import mockAuthServiceImpl, { mockGuestLogin, mockLogout } from "../services/__mocks__/auth.service.mock";
import { AuthController } from "./auth.controller";

jest.mock("../services/auth.service", () => {
  return {
    AuthServiceImpl: mockAuthServiceImpl
  };
});

jest.mock("../../utils/response-handler", () => {
  return {
    ResponseHandlerImpl: mockResponseHandlerImpl
  }
});

describe("Auth Component", () => {
  describe("Controller Module", () => {
    const authController = new AuthController();
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    const mockNextFunction: NextFunction = jest.fn();

    beforeEach(() => {
      mockRequest = {};
      mockResponse = {
        status: jest.fn(
          () =>
          ({
            send: jest.fn(),
          } as any)
        ),
      };
    });

    afterEach(() => {
      mockGuestLogin.mockReset();
      mockLogout.mockReset();
    });

    describe(`"guestLogin" method`, () => {

      describe("Exception Path", () => {
        it("If error occurs in auth service in registration method, should call the next middleware with error", async () => {
          const error = new Error("Something went wrong!");

          mockGuestLogin.mockImplementation(() => { throw error });

          await authController.guestLogin(
            mockRequest as Request,
            mockResponse as Response,
            mockNextFunction
          );

          expect(mockGuestLogin).toHaveBeenCalled();
          expect(mockNextFunction).toHaveBeenCalledWith(error);
        });
      });

      describe("Happy Path", () => {
        it("Request for guest login, should trigger register method in Auth Service", async () => {

          await authController.guestLogin(
            mockRequest as Request,
            mockResponse as Response,
            mockNextFunction
          );

          expect(mockGuestLogin).toHaveBeenCalled();
          expect(mockOk).toHaveBeenCalled();
        });
      });

    });

    describe(`"logout" method`, () => {
      describe("Exception Path", () => {
        it("If error occurs in auth service in logout method, should call the next middleware with error", async () => {
          const error = new Error("Something went wrong!");

          mockLogout.mockImplementation(() => { throw error });

          await authController.logout(
            mockRequest as Request,
            mockResponse as Response,
            mockNextFunction
          );

          expect(mockLogout).toHaveBeenCalledWith(mockRequest, mockResponse, mockNextFunction);
          expect(mockNextFunction).toHaveBeenCalledWith(error);
        });
      });

      describe("Happy Path", () => {
        it("Request for logout, should trigger logout method in auth service", async () => {

          await authController.logout(
            mockRequest as Request,
            mockResponse as Response,
            mockNextFunction
          );

          expect(mockLogout).toHaveBeenCalledWith(mockRequest, mockResponse, mockNextFunction);
          expect(mockOk).toHaveBeenCalled();
        });
      });
    });
  });
});
