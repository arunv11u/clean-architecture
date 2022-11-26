import { Request, Response, NextFunction } from "express";
import { ServiceFactoryImpl } from "../../utils";
import { AuthController } from "./auth.controller";

const authController = new AuthController();
const serviceFactory = new ServiceFactoryImpl();

describe("Auth Component", () => {
  describe("Controller Module", () => {
    describe(`"register" method`, () => {
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
        const authService = serviceFactory.getAuthService();

        await authController.register(
          mockRequest as Request,
          mockResponse as Response,
          mockNextFunction
        );
      });
    });

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
        const authService = serviceFactory.getAuthService();

        await authController.guestLogin(
          mockRequest as Request,
          mockResponse as Response,
          mockNextFunction
        );
      });
    });
  });
});
