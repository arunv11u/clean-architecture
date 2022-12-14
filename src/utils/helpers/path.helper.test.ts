import path from "path";
import { GenericError } from "../errors";
import { PathHelperImpl } from "./path.helper";

describe("Helper Module", () => {
  describe("Path Helper", () => {
    const pathHelper = new PathHelperImpl();

    describe(`"mergePath" fn`, () => {
      describe("Exception Path", () => {
        it("Passing undefined as an input data, should throw an error", () => {
          expect(() => pathHelper.mergePath(undefined as any)).toThrow(GenericError);
          expect(() => pathHelper.mergePath(undefined as any)).toThrow(
            "Input data is invalid, expected an array of strings"
          );
        });

        it("Passing object as an input data, should throw an error", () => {
          expect(() => pathHelper.mergePath({} as any)).toThrow(GenericError);
          expect(() => pathHelper.mergePath({} as any)).toThrow(
            "Input data is invalid, expected an array of strings"
          );
        });

        it("Passing array of object as an input data, should throw an error", () => {
          expect(() => pathHelper.mergePath([{}] as any)).toThrow(GenericError);
          expect(() => pathHelper.mergePath([{}] as any)).toThrow(
            "Input data is invalid, expected an array of strings"
          );
        });
      });

      describe("Happy Path", () => {
        it("Passing array of strings as an input, should return a string", () => {
          const mergedPath = pathHelper.mergePath(["/", "test", "test.png"]);
          expect(mergedPath).toBe(path.join("/test/test.png"));
        });
      });
    });
  });
});
