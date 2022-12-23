import { UserDAOImpl } from "../daos/user.dao";
import { UserPipeImpl } from "../pipes/user.pipe";
import { UserServiceImpl } from "../services/user.service";
import { UserValidationImpl } from "../validations/user.validation";
import { UserFactoryImpl } from "./user.factory";


describe("User Component", () => {
    const userFactory = new UserFactoryImpl();

    describe("Factory Module", () => {
        describe(`"getValidation" method`, () => {
            describe("Happy Path", () => {
                it("No inputs passed, should return User Validation Object", () => {
                    expect(userFactory.getValidation()).toBeInstanceOf(UserValidationImpl);
                });
            });
        });

        describe(`"getPipe" method`, () => {
            describe("Happy Path", () => {
                it("No inputs passed, should return User Service Object", () => {
                    expect(userFactory.getPipe()).toBeInstanceOf(UserPipeImpl);
                });
            });
        });

        describe(`"getService" method`, () => {
            describe("Happy Path", () => {
                it("No inputs passed, should return User Service Object", () => {
                    expect(userFactory.getService()).toBeInstanceOf(UserServiceImpl);
                });
            });
        });

        describe(`"getDAO" method`, () => {
            describe("Happy Path", () => {
                it("No inputs passed, should return User Service Object", () => {
                    expect(userFactory.getDAO()).toBeInstanceOf(UserDAOImpl);
                });
            });
        });
    });
});