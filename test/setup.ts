import "reflect-metadata";
import mongoose from 'mongoose';
import { app, server } from "../src/server";
import { Environment } from "../src/utils/types";
import { loader, connect, disconnect } from "./utils";

jest.setTimeout(3000);


beforeAll(async () => {
  await connect();
});

beforeEach(async () => {
  // Setting up process environment secrets:
  process.env.NODE_ENV = Environment.TEST;
  process.env.jwtSecretKey = "secret-key";
  process.env.dbConnectionStr = process.env.MONGO_URI;

  const collections = await mongoose.connection.db.collections();

  for (let collection of collections)
    await collection.deleteMany({});


  await loader(app, server);
});

afterEach(() => { });

afterAll(async () => {
  await disconnect();
});
