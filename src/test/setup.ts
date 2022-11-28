import "reflect-metadata";
import mongoose from 'mongoose';
import { app, server } from "../server";
import { Environment } from "../utils";
import { loader, connect, disconnect } from "./utils";


beforeAll(async () => {
  await connect();
});

beforeEach(async () => {
  // Setting up process environment secrets:
  process.env.NODE_ENV = Environment.TEST;

  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  };


  await loader(app, server);
});

afterEach(() => {});

afterAll(async () => {
  await disconnect();
});
