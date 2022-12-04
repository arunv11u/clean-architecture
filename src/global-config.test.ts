import { AuthFactoryImpl } from './auth';
import { getAuthFactory, getTokenFactory, getUserFactory } from './global-config';
import { TokenFactoryImpl } from './tokens';
import { UserFactoryImpl } from './users';

describe("Global config module", () => {

    describe(`"getAuthFactory" fn`, () => {
        it("No input passed, should return Auth Factory", () => {
            expect(getAuthFactory()).toBeInstanceOf(AuthFactoryImpl);
        });
    });

    describe(`"getUserFactory" fn`, () => {
        it("No input passed, should return User Factory", () => {
            expect(getUserFactory()).toBeInstanceOf(UserFactoryImpl);
        });
    });

    describe(`"getTokenFactory" fn`, () => {
        it("No input passed, should return User Factory", () => {
            expect(getTokenFactory()).toBeInstanceOf(TokenFactoryImpl);
        });
    });
});
