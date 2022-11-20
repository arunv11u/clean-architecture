import 'reflect-metadata';
import { app, server } from '../server';
import { loader } from "./utils";


beforeAll(async () => {
    // Setting up process environment secrets:
    //* Example: process.env['STORAGE_ACCESS_KEY'] = 'some_storage_access_key';
    
});

beforeEach(async () => {
    // const collections = await mongoose.connection.db.collections();

    // for (let collection of collections) {
    //     await collection.deleteMany({});
    // };

    await loader(app, server);
});

afterAll(async () => {
    // await disconnect();
});
