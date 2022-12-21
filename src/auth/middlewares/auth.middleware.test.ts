import { Request, Response } from "express";
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import mockTokenServiceImpl, { mockUser, mockVerify, mockRefreshUser } from "../../tokens/services/__mocks__/token.service.mock";
import mockMongooseServiceImpl, { mockSave, mockFindOne } from "../../utils/services/__mocks__/mongoose.service.mock";
import { TokenServiceImpl } from "../../tokens/services/token.service";
import { AuthMiddleware, DatabaseService, GenericError, MongooseServiceImpl, TokenService, TokenTypes } from "../../utils";
import { AuthMiddlewareImpl } from "./auth.middleware";
import { User } from "../../users/models/user.model";


jest.mock('../../tokens/services/token.service', () => {
    const originalModule =
        jest.requireActual<typeof import('../../tokens/services/token.service')>('../../tokens/services/token.service');

    return {
        __esModule: true,
        ...originalModule,
        TokenServiceImpl: mockTokenServiceImpl
    };
});

jest.mock('../../utils/services/mongoose.service', () => {
    const originalModule =
        jest.requireActual<typeof import('../../utils/services/mongoose.service')>('../../utils/services/mongoose.service');

    return {
        __esModule: true,
        ...originalModule,
        MongooseServiceImpl: mockMongooseServiceImpl
    };
});

describe("Auth Component", () => {
    describe("Auth Middleware", () => {

        let authMiddleware: AuthMiddleware;
        let mockTokenServiceImpl: TokenService;
        let mockMongooseServiceImpl: DatabaseService;
        let mockRequest: Partial<Request>;
        let mockResponse: Partial<Response>;
        const mockNextFn: jest.Mock = jest.fn();
        let authCheck: any;
        const mockCookieFn: jest.Mock = jest.fn();

        beforeEach(() => {
            authMiddleware = new AuthMiddlewareImpl();
            mockTokenServiceImpl = new TokenServiceImpl();
            mockMongooseServiceImpl = new MongooseServiceImpl();

            mockRequest = {
                signedCookies: {}
            };
            mockResponse = {
                cookie: mockCookieFn,
                locals: {}
            };
            authCheck = authMiddleware.checkAuthorization();
        });

        describe("checkAuthorization method", () => {
            describe("Exception Path", () => {
                it("Empty signed cookies passed, should throw error", async () => {

                    await authCheck(mockRequest as Request, mockResponse as Response, mockNextFn);

                    expect(mockNextFn).toHaveBeenCalledWith(new GenericError({ error: new Error("Unauthorized"), errorCode: 401 }));
                });
            });

            describe("Happy Path", () => {
                it("Signed cookies provided and the access token is valid, should decode the token and set the user obj", async () => {
                    mockRequest.signedCookies.lifeversechristmasevent_auth = faker.random.alphaNumeric(10);
                    const decodedToken = {
                        type: TokenTypes.auth,
                        userId: faker.random.alphaNumeric()
                    };
                    const userObj = {
                        _id: new mongoose.Types.ObjectId(),
                        userId: faker.random.alphaNumeric(10),
                        name: faker.name.fullName()
                    };

                    mockVerify.mockImplementation(() => {
                        return decodedToken;
                    });

                    mockFindOne.mockImplementation(() => {
                        return new User(userObj);
                    });

                    await authCheck(mockRequest as Request, mockResponse as Response, mockNextFn);

                    expect(mockVerify).toHaveBeenCalled();
                    expect(mockFindOne).toHaveBeenCalled();
                    expect(mockResponse.locals).toStrictEqual({
                        decodedToken,
                        user: {
                            id: userObj._id,
                            name: userObj.name,
                            userId: userObj.userId,
                            isDeleted: false
                        }
                    });
                });

                it("Signed cookies provided and the access token is invalid, should refresh the token and set the auth and refresh cookies", async () => {
                    mockRequest.signedCookies.lifeversechristmasevent_auth = faker.random.alphaNumeric(10);
                    const decodedToken = {
                        type: TokenTypes.auth,
                        userId: faker.random.alphaNumeric()
                    };
                    const userObj = {
                        _id: new mongoose.Types.ObjectId(),
                        userId: faker.random.alphaNumeric(10),
                        name: faker.name.fullName()
                    };
                    const tokens = {
                        accessToken: faker.random.alphaNumeric(),
                        refreshToken: faker.random.alphaNumeric()
                    };

                    mockVerify.mockImplementation(() => { throw new Error("Access token is expired") });

                    mockRefreshUser.mockImplementation(() => ({
                        tokens,
                        userDecodedPayload: decodedToken
                    }));

                    mockFindOne.mockImplementation(() => {
                        return new User(userObj);
                    });

                    await authCheck(mockRequest as Request, mockResponse as Response, mockNextFn);

                    expect(mockVerify).toHaveBeenCalled();
                    expect(mockRefreshUser).toHaveBeenCalled();
                    expect(mockFindOne).toHaveBeenCalled();
                    expect(mockResponse.locals).toStrictEqual({
                        decodedToken,
                        user: {
                            id: userObj._id,
                            name: userObj.name,
                            userId: userObj.userId,
                            isDeleted: false
                        }
                    });
                });
            });
        });
    });
});
