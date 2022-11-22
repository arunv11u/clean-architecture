import { ServiceFactory } from "../../utils";
import { AuthService } from "./auth.service";

const serviceFactory = ServiceFactory.getInstance();

describe("Auth Component", () => {
  describe("Service Module", () => {
    describe(`"getInstance" method`, () => {
      describe("Happy Path", () => {
        it("If user email already exists, should throw error", () => {
          const authService = serviceFactory.getAuthService();
          expect(authService).toBeInstanceOf(AuthService);
        });
      });
    });

    describe(`"getUser" method`, () => {
      // describe("Exception Path", () => {
      //   it("If user email already exists, should throw error", () => {
      //       const authService = serviceFactory.getAuthService();
      //   });
      // });
    });
  });
});
