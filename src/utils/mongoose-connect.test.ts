import mongoose, { Mongoose } from 'mongoose';
import { GenericError } from "./errors";
import { MongooseConnect } from "./mongoose-connect";

describe("Mongoose Connect Module", () => {
    const mongooseConnect = MongooseConnect.getInstance();
    const dbConnectionString = "mongodb://localhost:27017";

    describe(`"getInstance" method`, () => {
        describe("Happy Path", () => {
            it("No input passed, should return Mongoose Connect Object", () => {
                expect(mongooseConnect).toBeInstanceOf(MongooseConnect);
            });
        });
    });

    describe(`"mongoose" setter`, () => {
        describe("Exception Path", () => {
            it("Other than mongoose object is passed as input, should throw error", () => {
                const inputValue = "" as any;
                expect(() => (mongooseConnect.mongoose = inputValue)).toThrow(GenericError);
                expect(() => (mongooseConnect.mongoose = inputValue)).toThrow(`Expected mongoose object, but got ${typeof inputValue}`);
            });
        });

        describe("Happy Path", () => {
            it.skip("If mongoose object is passed as input, should not throw error", () => {
                expect(() => (mongooseConnect.mongoose = mongoose)).not.toThrow(GenericError);
            });
        });
    });

    describe(`"mongoose" getter`, () => {
        describe("Exception Path", () => {
            it("Get mongoose without setting up, should throw error", () => {
                expect(() => mongooseConnect.mongoose).toThrow(GenericError);
                expect(() => mongooseConnect.mongoose).toThrow("Cannot get mongoose without setting it up");
            });
        });

        describe("Happy Path", () => {
            it.skip("After setting mongoose, should return mongoose", () => {
                mongooseConnect.mongoose = mongoose;
                expect(mongooseConnect.mongoose).toBeInstanceOf(Mongoose);
            });
        });
    });

    describe(`"dbConnectionString" setter`, () => {
        describe("Exception Path", () => {
            it("Other than string is passed as input, should throw error", () => {
                const inputValue = [] as any;
                expect(() => (mongooseConnect.dbConnectionString = inputValue)).toThrow(GenericError);
                expect(() => (mongooseConnect.dbConnectionString = inputValue)).toThrow(`Expected string, but got ${typeof inputValue}`);
            });

            it("Empty string is passed as input, should throw error", () => {
                const inputValue = "";
                expect(() => (mongooseConnect.dbConnectionString = inputValue)).toThrow(GenericError);
                expect(() => (mongooseConnect.dbConnectionString = inputValue)).toThrow(`Expected string, but got ${typeof inputValue}`);
            });

            it.skip("If db connection string is already set up, should throw error", () => {
                const inputValue = "Over-writing existing connection string";
                mongooseConnect.dbConnectionString = "Existing Db connection string";
                expect(() => mongooseConnect.dbConnectionString = inputValue).toThrow(GenericError);
                expect(() => mongooseConnect.dbConnectionString = inputValue).toThrow("_dbConnectionString cannot be changed once you set it");
            });
        });

        describe("Happy Path", () => {
            it.skip("If mongoose object is passed as input, should not throw error", () => {
                expect(() => (mongooseConnect.mongoose = mongoose)).not.toThrow(GenericError);
            });
        });
    });

    describe(`"dbConnectionString" getter`, () => {
        describe("Exception Path", () => {
            it("Get db connection string without setting up, should throw error", () => {
                expect(() => mongooseConnect.dbConnectionString).toThrow(GenericError);
                expect(() => mongooseConnect.dbConnectionString).toThrow("Must set the db connection string before trying to get it");
            });
        });

        describe("Happy Path", () => {
            it.skip("After setting db connection string, should return db connection string", () => {
                mongooseConnect.dbConnectionString = dbConnectionString;
                expect(mongooseConnect.dbConnectionString).toBe(dbConnectionString);
            });
        });
    });

    describe(`"connect" method`, () => {
        describe("Exception Path", () => {
            it("Mongoose not set, should throw error", () => {
                expect(() => mongooseConnect.connect()).rejects.toThrow(GenericError);
                expect(() => mongooseConnect.connect()).rejects.toThrow("Must set mongoose before trying to connect");
            });

            it("Db connection string not set, should throw error", () => {
                mongooseConnect.mongoose = mongoose;
                expect(() => mongooseConnect.connect()).rejects.toThrow(GenericError);
                expect(() => mongooseConnect.connect()).rejects.toThrow("Must set the db connection string and mongoose before trying to connect");
            });

            it.skip("If db connection string is invalid or failed to connect to db, should throw error", () => {
                mongooseConnect.dbConnectionString = "Invalid db connection string";
                expect(() => mongooseConnect.connect()).rejects.toThrow(GenericError);
                expect(() => mongooseConnect.connect()).rejects.toThrow("Db connection failed");
            });
        });

        describe("Happy Path", () => {
            // Only run this test after disabling mongodb-memory-server in the test environment.
            it.skip("If all required values are set, should connect to db and return true", () => {
                mongooseConnect.mongoose = mongoose;
                mongooseConnect.dbConnectionString = dbConnectionString;
                expect(mongooseConnect.connect()).resolves.toBe(true);
            });
        });
    });
});

