import { loader } from "./loader";
import { app, server } from "../server";
import mockMongooseConnect, { mockConnect } from "./__mocks__/mongoose-connect";

console.log("loader test file loaded :");

jest.mock('./mongoose-connect', () => {
  return {
    MongooseConnect: mockMongooseConnect
  };
});

console.log("mockMongooseConnectSingleton ::", mockMongooseConnect);

console.log("mockConnect ::", mockConnect);

describe("Loader Module", () => {
  describe(`"loader" fn`, () => {
    describe("Happy Path", () => {
      it(`Express application and Http Server passed as an arguments, 
        should load the necessary modules and return true`, () => {
        loader(app, server).then((result) => {

          expect(mockConnect).toHaveBeenCalled();
          expect(result).toBe(true);
        });
      });
    });
  });
});
