import mongoose from "mongoose";
import { DatabaseConnectionError, GenericError } from "./errors";
import { MongooseConnect } from './mongoose-connect';

jest.mock('mongoose');

describe("Mongoose Connect Module", () => {
    const dbConnectionString = "mongodb://localhost:27017";
    const mongooseConnect = new MongooseConnect();
    const mockConnect = jest.fn();

    beforeEach(() => {
        mongoose.connect = mockConnect;
    });

    afterEach(() => {
        mockConnect.mockReset();
    });

    describe(`"connect" method`, () => {
        describe("Exception Path", () => {
            it("Db connection string not set, should throw error", () => {
                expect(() => mongooseConnect.connect(undefined as any)).rejects.toThrow(GenericError);
                expect(() => mongooseConnect.connect(undefined as any)).rejects.toThrow("Db connection string is required to connect to the database");
            });

            it("If db connection string is invalid or failed to connect to db, should throw error", () => {
                mockConnect.mockImplementation(() => { throw new Error("Db connection failed!") });

                expect(() => mongooseConnect.connect(dbConnectionString)).rejects.toThrow(DatabaseConnectionError);
                expect(() => mongooseConnect.connect(dbConnectionString)).rejects.toThrow("Error, connecting to the database");
            });
        });

        describe("Happy Path", () => {

            it("If all required values are set, should connect to db and return true", () => {
                expect(mongooseConnect.connect(dbConnectionString)).resolves.toBe(true);
            });
        });
    });
});

