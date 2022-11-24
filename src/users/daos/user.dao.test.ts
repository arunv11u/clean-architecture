
import { GenericError } from "../../utils";
import { UserDAO } from './user.dao';

describe("Auth Component", () => {
    describe("Repository Module", () => {
        const userDAO = UserDAO.getInstance();

        describe(`"create" method`, () => {
            describe("Exception Path", () => {
                it("If undefined passed as an argument, should throw error", () => {
                    expect(() => userDAO.create(undefined as any)).rejects.toThrow(GenericError);
                    expect(() => userDAO.create(undefined as any)).rejects.toThrow("User details is undefined in create user DAO, expected user details");
                });
            });
        });
    });
});

