
import { faker } from "@faker-js/faker";
import mockMongooseServiceImpl, { mockSave } from '../../utils/services/__mocks__/mongoose.service';
import { CreateUserInput, GenericError, UserDAO } from "../../utils";
import { UserDAOMongooseImpl } from "./user.dao";


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
    });
});

