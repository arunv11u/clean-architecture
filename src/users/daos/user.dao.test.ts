
import { faker } from "@faker-js/faker";
import mockMongooseServiceImpl, { mockFindOne, mockSave } from '../../utils/services/__mocks__/mongoose.service';
import { CreateUserInput, GenericError, UserDAO } from "../../utils";
import { UserDAOMongooseImpl } from "./user.dao";
import { User } from "../models/user.model";


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

    beforeEach(() => {
        userDAO = new UserDAOMongooseImpl();

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
                    const userDAO = new UserDAOMongooseImpl();
                    const userDetails: CreateUserInput = {
                        name: faker.name.fullName(),
                        email: faker.internet.email(),
                        mobileNumber: faker.phone.number(),
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
                it("If undefined provided as userId, should throw error", () => {
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
    });
});

