
import { GenericError } from "../../utils";
import { UserDAOMongooseImpl } from "./user.dao";


jest.mock("../../utils/services/mongoose.service", () => {
    const originalModule =
    jest.requireActual<typeof import('../../utils/services/mongoose.service')>('../../utils/services/mongoose.service').MongooseServiceImpl;

    return {};
});

describe("Auth Component", () => {
    describe("Repository Module", () => {
        const userDAO = new UserDAOMongooseImpl();

        describe(`"save" method`, () => {
            describe("Exception Path", () => {
                it("If undefined passed as an argument, should throw error", () => {
                    expect(() => userDAO.save(undefined as any)).rejects.toThrow(GenericError);
                    expect(() => userDAO.save(undefined as any)).rejects.toThrow("User details is undefined in create user DAO, expected user details");
                });
            });
        });
    });
});

