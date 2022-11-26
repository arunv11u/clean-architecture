import { AuthRepoMongooseImpl } from "../../auth";
import { repositoryFactory } from "../../global-config";


describe("Factory Module", () => {
    describe("Repository Factory", () => {
        describe(`"getAuthRepository" method`, () => {
            describe("Happy Path", () => {
                it("No input has passed, should return user repository object", () => {
                    const authRepository = repositoryFactory.getAuthRepository();
                    expect(authRepository).toBeInstanceOf(AuthRepoMongooseImpl);
                });
            });
        });
    });
});
