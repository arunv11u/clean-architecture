import nconf from 'nconf';
import { app, server } from "../server";
import mockMongooseConnect, { mockConnect } from "./__mocks__/mongoose-connect.mock";
import { LoaderImpl } from "./loader";

jest.mock('./mongoose-connect', () => {
  return {
    MongooseConnect: mockMongooseConnect
  };
});

describe("Loader Module", () => {
  let loader: LoaderImpl;

  beforeEach(() => {
    loader = new LoaderImpl();
  });

  describe(`"loader" fn`, () => {
    describe("Happy Path", () => {
      it(`Express application and Http Server passed as an arguments, 
        should load the necessary modules and return true`, () => {
        loader.load(app, server).then((result) => {

          expect(mockMongooseConnect).toHaveBeenCalled();
          expect(mockConnect).toHaveBeenCalledWith(nconf.get("dbConnectionStr"));
          expect(result).toBe(true);
        });
      });
    });
  });
});
