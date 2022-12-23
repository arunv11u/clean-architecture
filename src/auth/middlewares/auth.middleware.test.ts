import { Request, Response } from "express";
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import mockTokenServiceImpl, { mockVerify, mockRefreshUser } from "../../tokens/services/__mocks__/token.service.mock";
import mockUserDAOImpl, { mockFindById } from "../../users/daos/__mocks__/user.dao.mock";
import { TokenServiceImpl } from "../../tokens/services/token.service";
import { AuthMiddleware, GenericError, TokenService, TokenTypes, UserDAO } from "../../utils";
import { AuthMiddlewareImpl } from "./auth.middleware";
import { UserDAOImpl } from "../../users/daos/user.dao";


jest.mock('../../tokens/services/token.service', () => {
    const originalModule =
        jest.requireActual<typeof import('../../tokens/services/token.service')>('../../tokens/services/token.service');

    return {
        __esModule: true,
        ...originalModule,
        TokenServiceImpl: mockTokenServiceImpl
    };
});

jest.mock('../../users/daos/user.dao', () => {
    const originalModule =
        jest.requireActual<typeof import('../../users/daos/user.dao')>('../../users/daos/user.dao');

    return {
        __esModule: true,
        ...originalModule,
        UserDAOImpl: mockUserDAOImpl
    };
});

describe("Auth Component", () => {
    describe("Auth Middleware", () => {

        let authMiddleware: AuthMiddleware;
        let mockTokenService: TokenService;
        let mockUserDAO: UserDAO;
        let mockRequest: Partial<Request>;
        let mockResponse: Partial<Response>;
        const mockNextFn: jest.Mock = jest.fn();
        let authCheck: any;
        const mockCookieFn: jest.Mock = jest.fn();

        beforeEach(() => {
            mockTokenService = new TokenServiceImpl();
            mockUserDAO = new UserDAOImpl();
            authMiddleware = new AuthMiddlewareImpl(mockTokenService, mockUserDAO);

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
                        id: new mongoose.Types.ObjectId(),
                        userId: faker.random.alphaNumeric(10),
                        name: faker.name.fullName(),
                        isDeleted: false
                    };

                    mockVerify.mockImplementation(() => {
                        return decodedToken;
                    });

                    mockFindById.mockImplementation(() => {
                        return userObj;
                    });

                    await authCheck(mockRequest as Request, mockResponse as Response, mockNextFn);

                    expect(mockVerify).toHaveBeenCalled();
                    expect(mockFindById).toHaveBeenCalled();
                    expect(mockResponse.locals).toStrictEqual({
                        decodedToken,
                        user: userObj
                    });
                });

                it("Signed cookies provided and the access token is invalid, should refresh the token and set the auth and refresh cookies", async () => {
                    mockRequest.signedCookies.lifeversechristmasevent_auth = faker.random.alphaNumeric(10);
                    const decodedToken = {
                        type: TokenTypes.auth,
                        userId: faker.random.alphaNumeric()
                    };
                    const userObj = {
                        id: new mongoose.Types.ObjectId(),
                        userId: faker.random.alphaNumeric(10),
                        name: faker.name.fullName(),
                        isDeleted: false
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

                    mockFindById.mockImplementation(() => {
                        return userObj;
                    });

                    await authCheck(mockRequest as Request, mockResponse as Response, mockNextFn);

                    expect(mockVerify).toHaveBeenCalled();
                    expect(mockRefreshUser).toHaveBeenCalled();
                    expect(mockFindById).toHaveBeenCalled();
                    expect(mockResponse.locals).toStrictEqual({
                        decodedToken,
                        user: userObj
                    });
                });
            });
        });
    });
});
