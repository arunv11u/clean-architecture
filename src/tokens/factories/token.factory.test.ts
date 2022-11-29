import { TokenDAOMongooseImpl } from "../daos/token.dao";
import { TokenServiceImpl } from "../services/token.service";
import { TokenFactoryImpl } from "./token.factory";


describe("Token Component", () => {
    const tokenFactory = new TokenFactoryImpl();

    describe("Factory Module", () => {
        describe(`"getDAO" method`, () => {
            describe("Happy Path", () => {
                it("No inputs passed, should return Token DAO Object", () => {
                    expect(tokenFactory.getDAO()).toBeInstanceOf(TokenDAOMongooseImpl);
                });
            });
        });

        describe(`"getService" method`, () => {
            describe("Happy Path", () => {
                it("No inputs passed, should return Token Service Object", () => {
                    expect(tokenFactory.getService()).toBeInstanceOf(TokenServiceImpl);
                });
            });
        });
    });
});
