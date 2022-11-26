import { daoFactory } from "../../global-config";
import { UserDAOMongooseImpl } from "../../users";


describe("Factory Module", () => {
    describe("DAO Factory", () => {
        describe(`"getUserDAO" method`, () => {
            describe("Happy Path", () => {
                it("No input has passed, should return user DAO object", () => { 
                    const userDAO = daoFactory.getUserDAO();
                    expect(userDAO).toBeInstanceOf(UserDAOMongooseImpl);
                });
            });
        });
    });
});
