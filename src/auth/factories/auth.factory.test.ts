import { AuthRepositoryImpl } from "../repositories/auth.repository";
import { AuthServiceImpl } from "../services/auth.service";
import { AuthValidationImpl } from "../validations/auth.validation";
import { AuthFactoryImpl } from "./auth.factory";

describe("Auth Component", () => {
    const authFactory = new AuthFactoryImpl();

    describe("Factory Module", () => {
        describe(`"getValidation" method`, () => {
            describe("Happy Path", () => {
                it("No inputs passed, should return Auth Validation Object", () => {
                    expect(authFactory.getValidation()).toBeInstanceOf(AuthValidationImpl);
                });
            });
        });

        describe(`"getService" method`, () => {
            describe("Happy Path", () => {
                it("No inputs passed, should return Auth Service Object", () => {
                    expect(authFactory.getService()).toBeInstanceOf(AuthServiceImpl);
                });
            });
        });

        describe(`"getRepository" method`, () => {
            describe("Happy Path", () => {
                it("No inputs passed, should return Auth Service Object", () => {
                    expect(authFactory.getRepository()).toBeInstanceOf(AuthRepositoryImpl);
                });
            });
        });
    });
});