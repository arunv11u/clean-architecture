
import { faker } from "@faker-js/faker";
import mockMongooseServiceImpl, { mockFindOne, mockSave } from '../../utils/services/__mocks__/mongoose.service.mock';
import { CreateUserInput, GenericError, MongooseHelper, MongooseHelperImpl, UserDAO } from "../../utils";
import { UserDAOImpl } from "./user.dao";
import { User, UserAttrs } from "../models/user.model";


jest.mock('../../utils', () => {
    const originalModule =
        jest.requireActual<typeof import('../../utils')>('../../utils');

    return {
        __esModule: true,
        ...originalModule,
        MongooseServiceImpl: mockMongooseServiceImpl
    };
});

describe("Auth Component", () => {
    let userDAO: UserDAO;
    let mongooseHelper: MongooseHelper;

    beforeEach(() => {
        userDAO = new UserDAOImpl();
        mongooseHelper = new MongooseHelperImpl();

        mockFindOne.mockReset();
    });

    describe("Repository Module", () => {

        describe(`"save" method`, () => {
            describe("Exception Path", () => {
                it("If undefined passed as an argument, should throw error", () => {
                    expect(() => userDAO.save(undefined as any)).rejects.toThrow(GenericError);
                    expect(() => userDAO.save(undefined as any)).rejects.toThrow("User details is undefined in create user DAO, expected user details");
                });
            });

            describe("Happy Path", () => {
                it("User details passed, should save the user", async () => {
                    const userDAO = new UserDAOImpl();
                    const userDetails: CreateUserInput = {
                        name: faker.name.fullName(),
                        email: faker.internet.email(),
                        phone: {
                            code: "+91",
                            number: "9876543210"
                        },
                        userId: faker.random.alphaNumeric(8)
                    };

                    await userDAO.save(userDetails);
                    expect(mockMongooseServiceImpl).toHaveBeenCalled();
                    expect(mockSave).toHaveBeenCalled();
                });
            });
        });

        describe(`"checkUserExists" method`, () => {

            describe("Exception Path", () => {
                it("If undefined is provided as userId, should throw error", () => {
                    expect(() => userDAO.checkUserExists(undefined as any)).rejects.toThrow(GenericError);
                });
            });

            describe("Happy Path", () => {
                it("If userId already exists, should return false", () => {
                    mockFindOne.mockImplementation(() => false);

                    const userId = faker.random.alphaNumeric();
                    const isUserIdExists = userDAO.checkUserExists(userId);

                    expect(mockMongooseServiceImpl).toHaveBeenCalled();
                    expect(mockFindOne).toHaveBeenCalled();
                    expect(isUserIdExists).resolves.toBe(false);
                });

                it("If userId does not exist, should return true", () => {
                    mockFindOne.mockImplementation(() => true);

                    const userId = faker.random.alphaNumeric();
                    const isUserIdExists = userDAO.checkUserExists(userId);
                    const query = { userId };

                    expect(mockMongooseServiceImpl).toHaveBeenCalled();
                    expect(mockFindOne).toHaveBeenCalledWith(User, query);
                    expect(isUserIdExists).resolves.toBe(true);
                });
            });
        });

        describe(`"findById" method`, () => {

            describe("Exception Path", () => {
                it("If undefined is provided as id, should throw error", () => {
                    expect(() => userDAO.findById(undefined as any)).rejects.toThrow(GenericError);
                    expect(() => userDAO.findById(undefined as any)).rejects.toThrow("Id is invalid");
                });

                it("If user does not exist for the provided id, should throw error", () => {
                    mockFindOne.mockImplementation(() => null);

                    expect(() => userDAO.findById(mongooseHelper.getObjectId())).rejects.toThrow(GenericError);
                    expect(() => userDAO.findById(mongooseHelper.getObjectId())).rejects.toThrow("User not found");
                });
            });

            describe("Happy Path", () => {
                it("If valid id is provided, should return respective user details", async () => {
                    
                    const user = {
                        _id: mongooseHelper.getObjectId(),
                        name: faker.name.fullName(),
                        userId: faker.random.alphaNumeric(10),
                        email: faker.internet.email(),
                        __v: 0
                    };
                    mockFindOne.mockImplementation(() => new User(user));

                    const userObj = await userDAO.findById(mongooseHelper.getObjectId())

                    const expectedUser: any = { ...user, isDeleted: false };
                    expectedUser.id = expectedUser._id;
                    expectedUser.version = expectedUser.__v;
                    delete expectedUser._id;
                    delete expectedUser.__v;

                    expect(userObj).toStrictEqual(expectedUser);
                });
            });
        });
    });
});

