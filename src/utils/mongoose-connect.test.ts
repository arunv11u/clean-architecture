import { DatabaseConnectionError, GenericError } from "./errors";
import { MongooseConnect } from './mongoose-connect';


describe("Mongoose Connect Module", () => {
    const dbConnectionString = "mongodb://localhost:27017";
    const mongooseConnect = new MongooseConnect();

    describe(`"connect" method`, () => {
        describe("Exception Path", () => {
            it("Db connection string not set, should throw error", () => {
                expect(() => mongooseConnect.connect(undefined as any)).rejects.toThrow(GenericError);
                expect(() => mongooseConnect.connect(undefined as any)).rejects.toThrow("Db connection string is required to connect to the database");
            });

            // Only run this test after disabling mongodb-memory server in the test environment
            it.skip("If db connection string is invalid or failed to connect to db, should throw error", () => {
                expect(() => mongooseConnect.connect(dbConnectionString)).rejects.toThrow(DatabaseConnectionError);
                expect(() => mongooseConnect.connect(dbConnectionString)).rejects.toThrow("Error, connecting to the database");
            });
        });

        describe("Happy Path", () => {

            // Only run this test after disabling mongodb-memory server in the test environment
            it.skip("If all required values are set, should connect to db and return true", () => {
                expect(mongooseConnect.connect(dbConnectionString)).resolves.toBe(true);
            });
        });
    });
});

