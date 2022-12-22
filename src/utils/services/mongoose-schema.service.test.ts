import { faker } from "@faker-js/faker";
import mongoose, { Types } from "mongoose";
import { GenericError } from "../errors";
import { MongooseSchemaServiceImpl } from "./mongoose-schema.service";

describe("Mongoose Schema Service Module", () => {
    const mongooseSchemaService = new MongooseSchemaServiceImpl();

    describe(`"transform" getter`, () => {
        describe("Happy Path", () => {
            it("Should return transform function for the document", () => {
                const transform = mongooseSchemaService.transform;

                const documentData = {
                    _id: new mongoose.Types.ObjectId(),
                    name: faker.name.fullName(),
                    __v: 0
                };

                const returnValue = transform(documentData, { ...documentData });

                expect({ id: documentData._id, name: documentData.name, version: documentData.__v }).toStrictEqual(returnValue);
            });
        });
    });

    describe(`"schemaOptions" method`, () => {
        describe("Happy Path", () => {
            it("No input passed, should return mongoose schema options", () => {
                const schemaOptions = mongooseSchemaService.schemaOptions();
                const transform = mongooseSchemaService.transform;

                const expectedSchemaOptions = {
                    toJSON: {
                        transform,
                    },

                    timestamps: {
                        createdAt: 'creationDate',
                        updatedAt: 'lastModifiedDate',
                    }
                };

                expect(schemaOptions()).toStrictEqual(expectedSchemaOptions);
            });
        });
    });

    describe(`"getDocId" method`, () => {
        describe("Happy Path", () => {
            it("No input passed, should return new objectId", () => {
                expect(new mongoose.Types.ObjectId()).toBeInstanceOf(Types.ObjectId);
            });

            it("Stringified Object Id passed as an input, should return the same string as Object Id", () => {
                const objectId = new mongoose.Types.ObjectId();

                expect(mongooseSchemaService.getDocId(objectId.toString())).toBeInstanceOf(Types.ObjectId);
                expect(mongooseSchemaService.getDocId(objectId.toString())).toStrictEqual(objectId);
            });
        });
    });

    describe(`"setCreatedByAndUpdatedByOnSave" method`, () => {
        let mockQuery: Partial<mongoose.Query<any, any, {}, any>> & { locals?: any, excludeLocals?: any };
        let mockNextFn: jest.Func;

        beforeEach(() => {
            mockNextFn = jest.fn();
        });

        describe("Exception Path", () => {
            it("Locals is not passed in the query, should throw error", () => {
                mockQuery = {
                    get: jest.fn()
                };
                const setCreatedByAndUpdatedByOnSave = mongooseSchemaService.setCreatedByAndUpdatedByOnSave().bind(mockQuery as mongoose.Query<any, any, {}, any>);
                setCreatedByAndUpdatedByOnSave(mockNextFn);

                expect(mockNextFn).toHaveBeenCalledWith(new GenericError({ error: new Error(`"locals" is required field for setCreatedByAndUpdatedByOnSave mongoose middleware fn`), errorCode: 500 }));
            });

            it("Locals is passed and the user object is undefined in the query, should throw error", () => {
                mockQuery = {
                    get: jest.fn(function (this: any, data: string) { return this[data] }),
                    locals: {}
                };
                const setCreatedByAndUpdatedByOnSave = mongooseSchemaService.setCreatedByAndUpdatedByOnSave().bind(mockQuery as mongoose.Query<any, any, {}, any>);
                setCreatedByAndUpdatedByOnSave(mockNextFn);

                expect(mockNextFn).toHaveBeenCalledWith(new GenericError({ error: new Error(`"locals.user" doesn't exist in setCreatedByAndUpdatedByOnSave mongoose middleware fn`), errorCode: 500 }));
            });

            it(`Locals is passed with "user.id" is undefined in the query, should throw error`, () => {
                mockQuery = {
                    get: jest.fn(function (this: any, data: string) { return this[data] }),
                    locals: { user: {} }
                };
                const setCreatedByAndUpdatedByOnSave = mongooseSchemaService.setCreatedByAndUpdatedByOnSave().bind(mockQuery as mongoose.Query<any, any, {}, any>);
                setCreatedByAndUpdatedByOnSave(mockNextFn);

                expect(mockNextFn).toHaveBeenCalledWith(new GenericError({ error: new Error(`"locals.user.id" doesn't exist in setCreatedByAndUpdatedByOnSave mongoose middleware fn`), errorCode: 500 }));
            });
        });

        describe("Happy Path", () => {
            it("Exclude locals is passed as true, should skip setting createdBy and updatedBy fields", () => {
                mockQuery = {
                    get: jest.fn(function (this: any, data: string) { return this[data] }),
                    excludeLocals: true,
                    set: jest.fn()
                };

                const setCreatedByAndUpdatedByOnSave = mongooseSchemaService.setCreatedByAndUpdatedByOnSave().bind(mockQuery as mongoose.Query<any, any, {}, any>);
                setCreatedByAndUpdatedByOnSave(mockNextFn);

                expect(mockQuery.set).not.toHaveBeenCalled();
                expect(mockNextFn).toHaveBeenCalled();
            });

            it("Locals is set in the query, should set the createdBy and updatedBy fields", () => {
                mockQuery = {
                    get: jest.fn(function (this: any, data: string) { return this[data] }),
                    locals: { user: { id: new mongoose.Types.ObjectId() } },
                    set: jest.fn()
                };

                const setCreatedByAndUpdatedByOnSave = mongooseSchemaService.setCreatedByAndUpdatedByOnSave().bind(mockQuery as mongoose.Query<any, any, {}, any>);
                setCreatedByAndUpdatedByOnSave(mockNextFn);

                expect(mockQuery.set).toHaveBeenCalledTimes(2);
                expect(mockNextFn).toHaveBeenCalled();
            });
        });
    });

    describe(`"setCreatedByAndUpdatedByOnUpdate" method`, () => {
        let mockQuery: Partial<mongoose.Query<any, any, {}, any>> & { locals?: any, excludeLocals?: any };
        let mockNextFn: jest.Func;

        beforeEach(() => {
            mockNextFn = jest.fn();
        });

        describe("Exception Path", () => {
            it("Locals is not passed in the query, should throw error", () => {
                mockQuery = {
                    get: jest.fn()
                };
                const setCreatedByAndUpdatedByOnUpdate = mongooseSchemaService.setCreatedByAndUpdatedByOnUpdate().bind(mockQuery as mongoose.Query<any, any, {}, any>);
                setCreatedByAndUpdatedByOnUpdate(mockNextFn);

                expect(mockNextFn).toHaveBeenCalledWith(new GenericError({ error: new Error(`"locals" is required field for setCreatedByAndUpdatedByOnUpdate mongoose middleware fn`), errorCode: 500 }));
            });

            it("Locals is passed and the user object is undefined in the query, should throw error", () => {
                mockQuery = {
                    get: jest.fn(function (this: any, data: string) { return this[data] }),
                    locals: {}
                };
                const setCreatedByAndUpdatedByOnUpdate = mongooseSchemaService.setCreatedByAndUpdatedByOnUpdate().bind(mockQuery as mongoose.Query<any, any, {}, any>);
                setCreatedByAndUpdatedByOnUpdate(mockNextFn);

                expect(mockNextFn).toHaveBeenCalledWith(new GenericError({ error: new Error(`"locals.user" doesn't exist in setCreatedByAndUpdatedByOnUpdate mongoose middleware fn`), errorCode: 500 }));
            });

            it(`Locals is passed with "user.id" is undefined in the query, should throw error`, () => {
                mockQuery = {
                    get: jest.fn(function (this: any, data: string) { return this[data] }),
                    locals: { user: {} }
                };
                const setCreatedByAndUpdatedByOnUpdate = mongooseSchemaService.setCreatedByAndUpdatedByOnUpdate().bind(mockQuery as mongoose.Query<any, any, {}, any>);
                setCreatedByAndUpdatedByOnUpdate(mockNextFn);

                expect(mockNextFn).toHaveBeenCalledWith(new GenericError({ error: new Error(`"locals.user.id" doesn't exist in setCreatedByAndUpdatedByOnUpdate mongoose middleware fn`), errorCode: 500 }));
            });
        });

        describe("Happy Path", () => {
            it("Exclude locals is passed as true, should skip setting createdBy and updatedBy fields", () => {
                mockQuery = {
                    get: jest.fn(function (this: any, data: string) { return this[data] }),
                    excludeLocals: true,
                    set: jest.fn()
                };

                const setCreatedByAndUpdatedByOnUpdate = mongooseSchemaService.setCreatedByAndUpdatedByOnUpdate().bind(mockQuery as mongoose.Query<any, any, {}, any>);
                setCreatedByAndUpdatedByOnUpdate(mockNextFn);

                expect(mockQuery.set).not.toHaveBeenCalled();
                expect(mockNextFn).toHaveBeenCalled();
            });

            it("Locals is set in the query, should set the createdBy and updatedBy fields", () => {
                mockQuery = {
                    get: jest.fn(function (this: any, data: string) { return this[data] }),
                    locals: { user: { id: new mongoose.Types.ObjectId() } },
                    set: jest.fn()
                };

                const setCreatedByAndUpdatedByOnUpdate = mongooseSchemaService.setCreatedByAndUpdatedByOnUpdate().bind(mockQuery as mongoose.Query<any, any, {}, any>);
                setCreatedByAndUpdatedByOnUpdate(mockNextFn);

                expect(mockQuery.set).toHaveBeenCalledTimes(1);
                expect(mockNextFn).toHaveBeenCalled();
            });
        });
    });

    describe(`"versionUpdate" method`, () => {
        let mockQuery: Partial<mongoose.Query<any, any, {}, any>>;
        let mockNextFn: jest.Func;

        beforeEach(() => {
            mockQuery = {
                get: jest.fn(),
                update: jest.fn(),
                getOptions: jest.fn(() => ({}))
            };
            mockNextFn = jest.fn();
        });

        describe("Happy Path", () => {
            it("Mongoose document is passed as a input, should increment the version", () => {
                const versionUpdate = mongooseSchemaService.versionUpdate().bind(mockQuery as mongoose.Query<any, any, {}, any>);
                versionUpdate(mockNextFn);

                expect(mockQuery.update).toHaveBeenCalled();
                expect(mockNextFn).toHaveBeenCalled();
            });
        });
    });

    describe(`"excludeDeleteMiddleware" method`, () => {
        let mockQuery: Partial<mongoose.Query<any, any, {}, any>>;
        let mockNextFn: jest.Mock;
        let mockGetQuery: jest.Mock;

        beforeEach(() => {
            mockGetQuery = jest.fn();
            mockQuery = {
                getQuery: mockGetQuery,
                where: jest.fn()
            };
            mockNextFn = jest.fn();

        });

        afterEach(() => {
            jest.resetAllMocks();
        });

        describe("Happy Path", () => {
            it("If isDeleted option is not passed, should exclude isDeleted documents", () => {
                mockGetQuery.mockImplementation(() => ({}));

                const excludeDeleteMiddleware = mongooseSchemaService.excludeDeleteMiddleware().bind(mockQuery as mongoose.Query<any, any, {}, any>);
                excludeDeleteMiddleware(mockNextFn);

                expect(mockQuery.where).toHaveBeenCalledWith({ isDeleted: false });
                expect(mockNextFn).toHaveBeenCalled();
            });

            it("If isDeleted option is passed as true, should return only deleted documents", () => {
                mockGetQuery.mockImplementation(() => ({ isDeleted: true }));

                const excludeDeleteMiddleware = mongooseSchemaService.excludeDeleteMiddleware().bind(mockQuery as mongoose.Query<any, any, {}, any>);
                excludeDeleteMiddleware(mockNextFn);

                expect(mockQuery.where).not.toHaveBeenCalledWith({ isDeleted: false });
                expect(mockNextFn).toHaveBeenCalled();
            });

            it("If isDeleted option is passed with both true and false, should return both deleted and non deleted documents", () => {
                mockGetQuery.mockImplementation(() => ({ $and: [{ $or: [{ isDeleted: true }, { isDeleted: false }] }] }));

                const excludeDeleteMiddleware = mongooseSchemaService.excludeDeleteMiddleware().bind(mockQuery as mongoose.Query<any, any, {}, any>);
                excludeDeleteMiddleware(mockNextFn);

                expect(mockQuery.where).not.toHaveBeenCalledWith({ isDeleted: false });
                expect(mockNextFn).toHaveBeenCalled();
            });
        });
    });

    describe(`"excludeDeleteAggregateMiddleware" method`, () => {
        let mockAggregateQuery: Partial<mongoose.Aggregate<any>>;
        let mockNextFn: jest.Func;
        const mockUnshiftFn: jest.Func = jest.fn();

        beforeEach(() => {
            mockAggregateQuery = {
                options: {},
                pipeline: jest.fn(() => ({ unshift: mockUnshiftFn } as any))
            };
            mockNextFn = jest.fn();
        });

        describe("Happy Path", () => {
            it("If ignoreSoftDelete option is not passed, should return both deleted and non deleted documents", () => {
                const excludeDeleteAggregateMiddleware = mongooseSchemaService.excludeDeleteAggregateMiddleware().bind(mockAggregateQuery as mongoose.Aggregate<any>);
                excludeDeleteAggregateMiddleware(mockNextFn);

                expect(mockAggregateQuery.pipeline).toHaveBeenCalled();
                expect(mockUnshiftFn).toHaveBeenCalledWith({ $match: { isDeleted: false } });
                expect(mockNextFn).toHaveBeenCalled();
            });

            it("If ignoreSoftDelete option is passed as true, should return only deleted documents", () => {
                mockAggregateQuery.options = { ignoreSoftDelete: true };

                const excludeDeleteAggregateMiddleware = mongooseSchemaService.excludeDeleteAggregateMiddleware().bind(mockAggregateQuery as mongoose.Aggregate<any>);
                excludeDeleteAggregateMiddleware(mockNextFn);

                expect(mockAggregateQuery.pipeline).not.toHaveBeenCalled();
                expect(mockUnshiftFn).not.toHaveBeenCalledWith({ $match: { isDeleted: false } });
                expect(mockNextFn).toHaveBeenCalled();
            });
        });
    });
});
