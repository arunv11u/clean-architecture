import { GenericError } from "../../utils";
import { AuthRepository } from './auth.repository';

describe("Auth Component", () => {
    describe("Repository Module", () => {
        const authRepository = AuthRepository.getInstance();

        describe(`"guestLogin" method`, () => {
            describe("Exception Path", () => {
                it("If undefined passed as an argument, should throw error", () => {
                    expect(() => authRepository.guestLogin()).rejects.toThrow(GenericError);
                });
            });
        });
    });
});

