import { ServiceFactory } from "../../utils";
import { AuthService } from "./auth.service";

const serviceFactory = ServiceFactory.getInstance();

describe("Auth Component", () => {
  describe("Service Module", () => {
    describe(`"getInstance" method`, () => {
      describe("Happy Path", () => {
        it("No arguments passed, should return AuthService Object", () => {
          const authService = serviceFactory.getAuthService();
          expect(authService).toBeInstanceOf(AuthService);
        });
      });
    });

    describe(`"guestLogin" method`, () => {
      describe("Happy Path", () => {
        it("", () => {});
      });
    });
  });
});
