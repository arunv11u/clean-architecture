import "reflect-metadata";
import mongoose from 'mongoose';
import { app, server } from "../server";
import { Environment } from "../utils";
import { loader } from "./utils";
import { disconnect } from './utils/db-connect';

// Jest set timeout = 40 seconds, default 5 seconds overridden.
// jest.setTimeout(10000);

beforeAll(async () => { 
  await mongoose.connect(process.env.MONGO_URI as string);
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
