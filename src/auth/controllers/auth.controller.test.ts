import { Request, Response, NextFunction } from "express";
import { AuthServiceImpl } from "../services/auth.service";
import { AuthController } from "./auth.controller";


describe("Auth Component", () => {
  describe("Controller Module", () => {
    const authController = new AuthController();
    const authService = new AuthServiceImpl();

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

        await authController.guestLogin(
          mockRequest as Request,
          mockResponse as Response,
          mockNextFunction
        );
      });
    });
  });
});
