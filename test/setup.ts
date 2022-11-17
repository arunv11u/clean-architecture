import 'reflect-metadata';
import { app, server } from '../src/server';
import { loader } from './utils';


beforeAll(async () => {
    // Setting up process environment secrets:
    //* Example: process.env['STORAGE_ACCESS_KEY'] = 'some_storage_access_key';

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
