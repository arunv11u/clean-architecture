import { Request, Response } from "express";
import { faker } from "@faker-js/faker";
import mockTokenServiceImpl, { mockVerify, mockRefreshUser } from "../../tokens/services/__mocks__/token.service.mock";
import mockUserDAOImpl, { mockFindById } from "../../users/daos/__mocks__/user.dao.mock";
import mockCookieImpl, { mockClear, mockGetSignedCookies } from "../../utils/cookies/__mocks__/cookie.mock";
import { TokenServiceImpl } from "../../tokens/services/token.service";
import { AuthMiddleware, GenericError, MongooseHelper, MongooseHelperImpl, TokenService, TokenTypes, UserDAO } from "../../utils";
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

jest.mock('../../utils', () => {
    const originalModule =
        jest.requireActual<typeof import('../../utils')>('../../utils');

    return {
        __esModule: true,
        ...originalModule,
        CookieImpl: mockCookieImpl
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
        let mongooseHelper: MongooseHelper;

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
            mongooseHelper = new MongooseHelperImpl();
        });

        describe("checkAuthorization method", () => {
            describe("Exception Path", () => {
                it("Empty signed cookies passed, should throw error", async () => {
                    mockGetSignedCookies.mockImplementation(() => ({}));

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
                        id: mongooseHelper.getObjectId(),
                        userId: faker.random.alphaNumeric(10),
                        name: faker.name.fullName(),
                        isDeleted: false
                    };

                    mockGetSignedCookies.mockImplementation(() => ({
                        lifeverseChristmasEventAuthToken: faker.random.alphaNumeric(10),
                        lifeverseChristmasEventRefreshToken: faker.random.alphaNumeric(10)
                    }));
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
                        id: mongooseHelper.getObjectId(),
                        userId: faker.random.alphaNumeric(10),
                        name: faker.name.fullName(),
                        isDeleted: false
                    };
                    const tokens = {
                        accessToken: faker.random.alphaNumeric(),
                        refreshToken: faker.random.alphaNumeric()
                    };

                    mockGetSignedCookies.mockImplementation(() => ({
                        lifeverseChristmasEventAuthToken: faker.random.alphaNumeric(10),
                        lifeverseChristmasEventRefreshToken: faker.random.alphaNumeric(10)
                    }));
                    mockVerify.mockImplementation(() => { throw new Error("Access token is expired") });
                    mockRefreshUser.mockImplementation(() => ({
                        refreshedTokens: tokens,
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

                it("Signed cookies provided and the tokens are stolen, should clear cookies and throw error", async () => {
                    mockRequest.signedCookies.lifeversechristmasevent_auth = faker.random.alphaNumeric(10);

                    mockGetSignedCookies.mockImplementation(() => ({
                        lifeverseChristmasEventAuthToken: faker.random.alphaNumeric(10),
                        lifeverseChristmasEventRefreshToken: faker.random.alphaNumeric(10)
                    }));
                    mockVerify.mockImplementation(() => { throw new Error("Access token is expired") });
                    mockRefreshUser.mockImplementation(() => ({
                        isStolenToken: true
                    }));

                    await authCheck(mockRequest as Request, mockResponse as Response, mockNextFn);

                    expect(mockVerify).toHaveBeenCalled();
                    expect(mockNextFn).toHaveBeenCalledWith(new GenericError({ error: new Error("Session expired, please login to continue"), errorCode: 401 }));
                });
            });
        });
    });
});
