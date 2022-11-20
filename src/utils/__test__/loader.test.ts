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

    //   it.only(`If any unhandled rejection occurs, should caught by "unhandledRejection" listener`, async () => {
    //     await loader(app, server);

    //     jest.spyOn(process, "on").mockImplementation((event, handler): any => {
    //       console.log("event ::", event);
    //       if (event === "unhandledRejection") {
    //         console.log("unhandledRejection :: jest ::");
    //         handler(new Error("Something went wrong!"));
    //       }
    //     });
    //   });

      //   it(`If any uncaught exceptions occurs, should caught by "uncaughtException" listener`, async () => {
      //     await loader(app, server);

      //     jest.spyOn(process, "on").mockImplementation((event, handler): any => {
      //       if (event === "uncaughtException") {
      //         handler(new Error("Something went wrong!"));
      //       }
      //     });
      //   });
    });
  });
});
