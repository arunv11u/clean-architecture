import { Request, Response, NextFunction } from "express";
import mockResponseHandlerImpl, { mockOk } from "../../utils/__mocks__/response-handler";
import mockAuthServiceImpl, { mockGuestLogin } from "../services/__mocks__/auth.service";
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

    describe(`"guestLogin" method`, () => {
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

      it("Express request, response and next are passed as arguments, should trigger register method in Auth Service", async () => {

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
});
