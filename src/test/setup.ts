import "reflect-metadata";
import { app, server } from "../server";
import { Environment } from "../utils";
import { loader } from "./utils";

beforeAll(async () => {});

beforeEach(async () => {
  // Setting up process environment secrets:
  process.env.NODE_ENV = Environment.TEST;

  //* Example: process.env['STORAGE_ACCESS_KEY'] = 'some_storage_access_key';

  // const collections = await mongoose.connection.db.collections();

  // for (let collection of collections) {
  //     await collection.deleteMany({});
  // };

  await loader(app, server);
});

afterEach(() => {
//   jest.restoreAllMocks();
});

afterAll(async () => {
  // await disconnect();
});
