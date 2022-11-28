import { tokenFactory } from "../../global-config";
import { TokenDAOMongooseImpl } from "../daos/token.dao";
import { TokenServiceImpl } from "../services/token.service";


describe("Token Component", () => {

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
