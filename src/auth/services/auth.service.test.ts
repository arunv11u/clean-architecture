import { Request, Response, NextFunction } from "express";
import { ServiceFactory } from "../../utils";
import { AuthService } from "./auth.service";

const serviceFactory = ServiceFactory.getInstance();

describe("Auth Component", () => {
  describe("Service Module", () => {
    const authService = serviceFactory.getAuthService();
    let mockRequest: Partial<Request> = {};
    let mockResponse: Partial<Response> = {};
    const NextFunction: NextFunction = jest.fn();

    describe(`"getInstance" method`, () => {
      describe(`"guestLogin" method`, () => {
        describe("Exception Path", () => {
          it("", async () => {
            // await authService.guestLogin();
          });
        });

        describe("Happy Path", () => {
          it("", () => {});
        });
      });

      describe("Happy Path", () => {
        it("No arguments passed, should return AuthService Object", () => {
          expect(authService).toBeInstanceOf(AuthService);
        });
      });
    });
  });
});
