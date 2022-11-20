import { Routes } from "../routes";
import { app } from '../../server';

const routes = Routes.getInstance();

describe("Route Module", () => {
  describe(`"listen" fn`, () => {
    describe("Happy Path", () => {
      it("Express application passed as an argument, should register routes", () => {
        routes.listen(app);
      });
    });
  });
});
