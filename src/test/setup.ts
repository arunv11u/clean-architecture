import "reflect-metadata";
import mongoose from 'mongoose';
import { app, server } from "../server";
import { Environment } from "../utils";
import { loader } from "./utils";
import { disconnect } from './utils/db-connect';

jest.setTimeout(40000);

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

  // Create collection before hand here because mongoose transaction expects the collection namespace.
  // await mongoose.connection.db.createCollection('users');

  await loader(app, server);
});

afterEach(() => {});

afterAll(async () => {
  await disconnect();
});
