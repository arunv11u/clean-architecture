import 'reflect-metadata';
import { app, server } from '../server';
import { loader } from "./utils";


beforeAll(async () => {
    // Setting up process environment secrets:
    //* Example: process.env['STORAGE_ACCESS_KEY'] = 'some_storage_access_key';
    console.log("beforeAll method called :");
    await loader(app, server);
});

beforeEach(async () => {
    // const collections = await mongoose.connection.db.collections();

    // for (let collection of collections) {
    //     await collection.deleteMany({});
    // };
});

afterAll(async () => {
    // await disconnect();
});
