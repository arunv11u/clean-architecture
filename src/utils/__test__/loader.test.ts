import { loader } from "../loader";
import { app, server } from "../../server";

describe("Loader Module", () => {
  describe(`"loader" fn`, () => {
    describe("Happy Path", () => {
      it(`Express application and Http Server passed as an arguments, 
        should load the necessary modules and return true`, () => {
        loader(app, server).then((result) => {
          expect(result).toBe(true);
        });
      });
    });
  });
});
