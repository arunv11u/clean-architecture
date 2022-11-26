import { Request, Response, NextFunction } from "express";
import { AuthServiceImpl } from "./auth.service";


describe("Auth Component", () => {
  describe("Service Module", () => {
    const authService = new AuthServiceImpl();
    let mockRequest: Partial<Request> = {};
    let mockResponse: Partial<Response> = {};
    const NextFunction: NextFunction = jest.fn();

    describe(`"guestLogin" method`, () => {
      describe("Exception Path", () => {
        it("", async () => {
          // await authService.guestLogin();
        });
      });

      describe("Happy Path", () => {
        it("", () => { });
      });
    });
  });
});
