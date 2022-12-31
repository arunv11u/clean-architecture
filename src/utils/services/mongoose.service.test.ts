import { faker } from "@faker-js/faker";
import { InsertManyResult } from "mongodb";
import mongoose from "mongoose";
import { GenericError } from "../errors";
import { MongooseHelperImpl } from "../helpers";
import { MongooseHelper } from "../types";
import { MongooseServiceImpl } from "./mongoose.service";



describe("Mongoose Service Module", () => {
    const mongooseService = new MongooseServiceImpl();
    const mongooseHelper: MongooseHelper = new MongooseHelperImpl();

    const userSchema = new mongoose.Schema({
        name: { type: String },
        email: { type: String },
        phone: { _id: false, code: String, number: String }
    }, {
        toJSON: {
            transform: (doc: any, ret: any) => {
                return ret;
            }
        }
    });

    userSchema.statics.jsonObj = (doc: any) => {
        if (Array.isArray(doc)) {
            if (!doc[0]) return null;
            return doc.map((ele) => ele.toJSON());
        }
        if (doc) return doc.toJSON();

        return null;
    };

    const User = mongoose.model("_users", userSchema);

    describe(`"_reconnectIfDisconnected" method`, () => {
        describe("Happy path", () => {
            it("If mongoose is disconnected, should try and reconnect", async () => {
                await mongoose.disconnect();

                await mongooseService['_reconnectIfDisconnected']();

                expect(mongoose.connection.readyState).toBe(1);
            });
        });
    });

    describe(`"save" method`, () => {
        describe("Exception Path", () => {
            it("If collection reference is passed as undefined, should throw error", () => {
                expect(() => mongooseService.save(undefined as any)).rejects.toThrow(GenericError);
                expect(() => mongooseService.save(undefined as any)).rejects.toThrow("Expected collection reference, but got undefined");
            });
        });

        describe("Happy Path", () => {
            it("If all required inputs passed, should save and return document", async () => {
                const userInput = {
                    _id: mongooseHelper.getObjectId(),
                    name: faker.name.fullName(),
                    email: faker.internet.email(),
                    phone: { code: "+91", number: "9876543210" },
                };
                const newUser = new User(userInput);

                const saveRes = await mongooseService.save(newUser);
                expect((User as any).jsonObj(saveRes)).toStrictEqual({ ...userInput, __v: 0 });
            });
        });
    });

    describe(`"insertMany" method`, () => {
        describe("Exception Path", () => {
            it("If collection reference is passed as undefined, should throw error", () => {
                expect(() => mongooseService.insertMany(undefined as any, [])).rejects.toThrow(GenericError);
                expect(() => mongooseService.insertMany(undefined as any, [])).rejects.toThrow("Expected collection reference, but got undefined");
            });

            it("If docs to be inserted is passed as undefined, should throw error", () => {
                expect(() => mongooseService.insertMany(User, undefined as any)).rejects.toThrow(GenericError);
                expect(() => mongooseService.insertMany(User, undefined as any)).rejects.toThrow("Expected array of objects, but got undefined");
            });
        });

        describe("Happy Path", () => {
            it("If all required inputs passed, should save and return documents", async () => {
                const input = {
                    _id: mongooseHelper.getObjectId(),
                    name: faker.name.fullName(),
                    email: faker.internet.email(),
                    phone: { code: "+91", number: "9876543210" }
                };

                const insertManyRes = await mongooseService.insertMany(User, [input]);
                expect((User as any).jsonObj(insertManyRes)).toStrictEqual([{ ...input, __v: 0 }]);
            });

            it("If all required inputs passed with options, should save and return documents", async () => {
                const input = {
                    name: faker.name.fullName(),
                    email: faker.internet.email(),
                    phone: { code: "+91", number: "9876543210" }
                };

                const insertManyRes = await mongooseService.insertMany(User, [input], { rawResult: true } as any) as unknown as InsertManyResult;
                expect(insertManyRes.insertedCount).toBe(1);
            });
        });
    });

    describe(`"findById" method`, () => {
        describe("Exception Path", () => {
            it("If collection reference is passed as undefined, should throw error", () => {
                expect(() => mongooseService.findById(undefined as any, "")).rejects.toThrow(GenericError);
                expect(() => mongooseService.findById(undefined as any, "")).rejects.toThrow("Expected collection reference, but got undefined");
            });

            it("If id is passed as undefined, should throw error", () => {
                expect(() => mongooseService.findById(User, undefined as any)).rejects.toThrow(GenericError);
                expect(() => mongooseService.findById(User, undefined as any)).rejects.toThrow("Expected string, but got undefined");
            });
        });

        describe("Happy Path", () => {
            it("If id is passed, should return the respected document", async () => {
                const userInput = {
                    _id: mongooseHelper.getObjectId(),
                    name: faker.name.fullName(),
                    email: faker.internet.email(),
                    phone: { code: "+91", number: "9876543210" }
                };
                const newUser = new User(userInput);

                await mongooseService.save(newUser);

                const user = await mongooseService.findById(User, userInput._id.toString());
                expect((User as any).jsonObj(user)).toStrictEqual({ ...userInput, __v: 0 });
            });
        });
    });

    describe(`"findOne" method`, () => {
        describe("Exception Path", () => {
            it("If collection reference is passed as undefined, should throw error", () => {
                expect(() => mongooseService.findOne(undefined as any, {})).rejects.toThrow(GenericError);
                expect(() => mongooseService.findOne(undefined as any, {})).rejects.toThrow("Expected collection reference, but got undefined");
            });

            it("If id is passed as undefined, should throw error", () => {
                expect(() => mongooseService.findOne(User, undefined as any)).rejects.toThrow(GenericError);
                expect(() => mongooseService.findOne(User, undefined as any)).rejects.toThrow("Expected query object, but got undefined");
            });
        });

        describe("Happy Path", () => {
            it("If query is passed, should return the matched document", async () => {
                const userInput = {
                    _id: mongooseHelper.getObjectId(),
                    name: faker.name.fullName(),
                    email: faker.internet.email(),
                    phone: { code: "+91", number: "9876543210" }
                };
                const newUser = new User(userInput);

                await mongooseService.save(newUser);

                const user = await mongooseService.findOne(User, { _id: userInput._id.toString() });
                expect((User as any).jsonObj(user)).toStrictEqual({ ...userInput, __v: 0 });
            });
        });
    });

    describe(`"find" method`, () => {
        describe("Exception Path", () => {
            it("If collection reference is passed as undefined, should throw error", () => {
                expect(() => mongooseService.find(undefined as any, {})).rejects.toThrow(GenericError);
                expect(() => mongooseService.find(undefined as any, {})).rejects.toThrow("Expected collection reference, but got undefined");
            });

            it("If query is passed as undefined, should throw error", () => {
                expect(() => mongooseService.find(User, undefined as any)).rejects.toThrow(GenericError);
                expect(() => mongooseService.find(User, undefined as any)).rejects.toThrow("Expected query object, but got undefined");
            });
        });

        describe("Happy Path", () => {
            it("If query is passed, should return the matched document", async () => {
                const userInput = {
                    _id: mongooseHelper.getObjectId(),
                    name: faker.name.fullName(),
                    email: faker.internet.email(),
                    phone: { code: "+91", number: "9876543210" }
                };
                const newUser = new User(userInput);

                await mongooseService.save(newUser);

                const users = await mongooseService.find(User, { _id: userInput._id.toString() });
                expect((User as any).jsonObj(users)).toStrictEqual([{ ...userInput, __v: 0 }]);
            });
        });
    });

    describe(`"countDocuments" method`, () => {
        describe("Exception Path", () => {
            it("If collection reference is passed as undefined, should throw error", () => {
                expect(() => mongooseService.countDocuments(undefined as any, {})).rejects.toThrow(GenericError);
                expect(() => mongooseService.countDocuments(undefined as any, {})).rejects.toThrow("Expected collection reference, but got undefined");
            });

            it("If query is passed as undefined, should throw error", () => {
                expect(() => mongooseService.countDocuments(User, undefined as any)).rejects.toThrow(GenericError);
                expect(() => mongooseService.countDocuments(User, undefined as any)).rejects.toThrow("Expected query object, but got undefined");
            });
        });

        describe("Happy Path", () => {
            it("If query is passed, should return the matched document", async () => {
                const userInput = {
                    _id: mongooseHelper.getObjectId(),
                    name: faker.name.fullName(),
                    email: faker.internet.email(),
                    phone: { code: "+91", number: "9876543210" }
                };
                const newUser = new User(userInput);

                await mongooseService.save(newUser);

                const usersCount = await mongooseService.countDocuments(User, { _id: userInput._id.toString() });
                expect(usersCount).toBe(1);
            });
        });
    });

    describe(`"aggregate" method`, () => {
        describe("Exception Path", () => {
            it("If collection reference is passed as undefined, should throw error", () => {
                expect(() => mongooseService.aggregate(undefined as any, [{ $sort: { _id: -1 } }])).rejects.toThrow(GenericError);
                expect(() => mongooseService.aggregate(undefined as any, [{ $sort: { _id: -1 } }])).rejects.toThrow("Expected collection reference, but got undefined");
            });

            it("If pipeline stages are not defined, should throw error", () => {
                expect(() => mongooseService.aggregate(User, undefined as any)).rejects.toThrow(GenericError);
                expect(() => mongooseService.aggregate(User, undefined as any)).rejects.toThrow("Expected array of objects, but got undefined");
            });
        });

        describe("Happy Path", () => {
            it("If pipeline stages are passed, should return the matched documents", async () => {
                const userInput = {
                    _id: mongooseHelper.getObjectId(),
                    name: faker.name.fullName(),
                    email: faker.internet.email(),
                    phone: { code: "+91", number: "9876543210" }
                };
                const newUser = new User(userInput);

                await mongooseService.save(newUser);

                const users = await mongooseService.aggregate(User, [{ $sort: { _id: -1 } }]);
                expect(users).toStrictEqual([{ ...userInput, __v: 0 }]);
            });
        });
    });


    describe(`"findByIdAndUpdate" method`, () => {
        describe("Exception Path", () => {
            it("If collection reference is passed as undefined, should throw error", () => {
                expect(() => mongooseService.findByIdAndUpdate(undefined as any, "", {})).rejects.toThrow(GenericError);
                expect(() => mongooseService.findByIdAndUpdate(undefined as any, "", {})).rejects.toThrow("Expected collection reference, but got undefined");
            });

            it("If id is passed as undefined, should throw error", () => {
                expect(() => mongooseService.findByIdAndUpdate(User, undefined as any, {})).rejects.toThrow(GenericError);
                expect(() => mongooseService.findByIdAndUpdate(User, undefined as any, {})).rejects.toThrow("Expected string, but got undefined");
            });

            it("If update query is passed as undefined, should throw error", () => {
                const id = mongooseHelper.getObjectId();
                expect(() => mongooseService.findByIdAndUpdate(User, id, undefined as any)).rejects.toThrow(GenericError);
                expect(() => mongooseService.findByIdAndUpdate(User, id, undefined as any)).rejects.toThrow("Expected update query object, but got undefined");
            });
        });

        describe("Happy Path", () => {
            it("If id and update queries are passed, should update and return the document", async () => {
                const userInput = {
                    _id: mongooseHelper.getObjectId(),
                    name: faker.name.fullName(),
                    email: faker.internet.email(),
                    phone: { code: "+91", number: "9876543210" }
                };
                const newUser = new User(userInput);

                await mongooseService.save(newUser);

                const newName = faker.name.fullName();
                const updatedUser = await mongooseService.findByIdAndUpdate(User, userInput._id.toString(), { $set: { name: newName } }, { new: true });
                expect((User as any).jsonObj(updatedUser)).toStrictEqual({ ...userInput, name: newName, __v: 0 });
            });
        });
    });

    describe(`"findOneAndUpdate" method`, () => {
        describe("Exception Path", () => {
            it("If collection reference is passed as undefined, should throw error", () => {
                expect(() => mongooseService.findOneAndUpdate(undefined as any, {}, {})).rejects.toThrow(GenericError);
                expect(() => mongooseService.findOneAndUpdate(undefined as any, {}, {})).rejects.toThrow("Expected collection reference, but got undefined");
            });

            it("If query is passed as undefined, should throw error", () => {
                expect(() => mongooseService.findOneAndUpdate(User, undefined as any, {})).rejects.toThrow(GenericError);
                expect(() => mongooseService.findOneAndUpdate(User, undefined as any, {})).rejects.toThrow("Expected query object, but got undefined");
            });

            it("If update query is passed as undefined, should throw error", () => {
                expect(() => mongooseService.findOneAndUpdate(User, {}, undefined as any)).rejects.toThrow(GenericError);
                expect(() => mongooseService.findOneAndUpdate(User, {}, undefined as any)).rejects.toThrow("Expected update query object, but got undefined");
            });
        });

        describe("Happy Path", () => {
            it("If filter and update queries are passed, should update and return the document", async () => {
                const userInput = {
                    _id: mongooseHelper.getObjectId(),
                    name: faker.name.fullName(),
                    email: faker.internet.email(),
                    phone: { code: "+91", number: "9876543210" }
                };
                const newUser = new User(userInput);

                await mongooseService.save(newUser);

                const newName = faker.name.fullName();
                const updatedUser = await mongooseService.findOneAndUpdate(User, { _id: userInput._id.toString() }, { $set: { name: newName } }, { new: true });
                expect((User as any).jsonObj(updatedUser)).toStrictEqual({ ...userInput, name: newName, __v: 0 });
            });
        });
    });

    describe(`"updateOne" method`, () => {
        describe("Exception Path", () => {
            it("If collection reference is passed as undefined, should throw error", () => {
                expect(() => mongooseService.updateOne(undefined as any, {}, {})).rejects.toThrow(GenericError);
                expect(() => mongooseService.updateOne(undefined as any, {}, {})).rejects.toThrow("Expected collection reference, but got undefined");
            });

            it("If query is passed as undefined, should throw error", () => {
                expect(() => mongooseService.updateOne(User, undefined as any, {})).rejects.toThrow(GenericError);
                expect(() => mongooseService.updateOne(User, undefined as any, {})).rejects.toThrow("Expected query object, but got undefined");
            });

            it("If update query is passed as undefined, should throw error", () => {
                expect(() => mongooseService.updateOne(User, {}, undefined as any)).rejects.toThrow(GenericError);
                expect(() => mongooseService.updateOne(User, {}, undefined as any)).rejects.toThrow("Expected update query object, but got undefined");
            });
        });

        describe("Happy Path", () => {
            it("If filter and update queries are passed, should update and return the document", async () => {
                const userInput = {
                    _id: mongooseHelper.getObjectId(),
                    name: faker.name.fullName(),
                    email: faker.internet.email(),
                    phone: { code: "+91", number: "9876543210" }
                };
                const newUser = new User(userInput);

                await mongooseService.save(newUser);

                const newName = faker.name.fullName();
                const updateResult = await mongooseService.updateOne(User, { _id: userInput._id.toString() }, { $set: { name: newName } });
                expect(updateResult.modifiedCount).toBe(1);
            });
        });
    });

    describe(`"updateMany" method`, () => {
        describe("Exception Path", () => {
            it("If collection reference is passed as undefined, should throw error", () => {
                expect(() => mongooseService.updateMany(undefined as any, {}, {})).rejects.toThrow(GenericError);
                expect(() => mongooseService.updateMany(undefined as any, {}, {})).rejects.toThrow("Expected collection reference, but got undefined");
            });

            it("If query is passed as undefined, should throw error", () => {
                expect(() => mongooseService.updateMany(User, undefined as any, {})).rejects.toThrow(GenericError);
                expect(() => mongooseService.updateMany(User, undefined as any, {})).rejects.toThrow("Expected query object, but got undefined");
            });

            it("If update query is passed as undefined, should throw error", () => {
                expect(() => mongooseService.updateMany(User, {}, undefined as any)).rejects.toThrow(GenericError);
                expect(() => mongooseService.updateMany(User, {}, undefined as any)).rejects.toThrow("Expected update query object, but got undefined");
            });
        });

        describe("Happy Path", () => {
            it("If filter and update queries are passed, should update and return the document", async () => {
                const phoneNumber = "9876543210";
                const userInput = [
                    {
                        _id: mongooseHelper.getObjectId(),
                        name: faker.name.fullName(),
                        email: faker.internet.email(),
                        phone: { code: "+91", number: phoneNumber }
                    },
                    {
                        _id: mongooseHelper.getObjectId(),
                        name: faker.name.fullName(),
                        email: faker.internet.email(),
                        phone: { code: "+91", number: phoneNumber }
                    }];

                await mongooseService.insertMany(User, userInput);

                const newName = faker.name.fullName();
                const updateResult = await mongooseService.updateMany(User, { number: phoneNumber }, { $set: { name: newName } });
                expect(updateResult.modifiedCount).toBe(2);
            });
        });
    });

    describe(`"findOneAndDelete" method`, () => {
        describe("Exception Path", () => {
            it("If collection reference is passed as undefined, should throw error", () => {
                expect(() => mongooseService.findOneAndDelete(undefined as any, {}, {})).rejects.toThrow(GenericError);
                expect(() => mongooseService.findOneAndDelete(undefined as any, {}, {})).rejects.toThrow("Expected collection reference, but got undefined");
            });

            it("If query is passed as undefined, should throw error", () => {
                expect(() => mongooseService.findOneAndDelete(User, undefined as any, {})).rejects.toThrow(GenericError);
                expect(() => mongooseService.findOneAndDelete(User, undefined as any, {})).rejects.toThrow("Expected query object, but got undefined");
            });
        });

        describe("Happy Path", () => {
            it("If filter and update queries are passed, should update and return the document", async () => {
                const userInput = {
                    _id: mongooseHelper.getObjectId(),
                    name: faker.name.fullName(),
                    email: faker.internet.email(),
                    phone: { code: "+91", number: "9876543210" }
                };
                const newUser = new User(userInput);

                await mongooseService.save(newUser);

                const deletedResult = await mongooseService.findOneAndDelete(User, { _id: userInput._id.toString() });
                expect((User as any).jsonObj(deletedResult)).toStrictEqual({ ...userInput, __v: 0 });
            });
        });
    });
});

