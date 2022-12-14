import { faker } from "@faker-js/faker";
import jwt from 'jsonwebtoken';
import { UserTokenPayload, TokenService, GenericError, TokenTypes, MongooseHelper, MongooseHelperImpl } from "../../utils";
import mockTokenRepositoryImpl, { mockMarkStolenRefreshTokensIfStolen } from '../repositories/__mocks__/token.repository.mock';
import { mockUser, mockVerify } from './__mocks__/token.service.mock';
import { TokenServiceImpl } from "./token.service";

const mongooseHelper: MongooseHelper = new MongooseHelperImpl();

jest.mock("jsonwebtoken");
jest.mock('../repositories/token.repository', () => {
    const originalModule =
        jest.requireActual<typeof import('../repositories/token.repository')>('../repositories/token.repository');

    return {
        __esModule: true,
        ...originalModule,
        TokenRepositoryImpl: mockTokenRepositoryImpl
    };
});


describe("Token Component", () => {
    describe("Token Service Module", () => {
        const userId = faker.random.alphaNumeric(8);
        let tokenService: TokenService;
        const tokenId = mongooseHelper.getObjectId();

        beforeEach(() => {
            tokenService = new TokenServiceImpl();

            (jwt.sign as any) = (payload: string | object | Buffer, secretOrPrivateKey: jwt.Secret, options: jwt.SignOptions | undefined, cb: (err: null | Error, token: string) => void): void => {
                cb(null, faker.random.alphaNumeric(12));
            };

            (jwt.verify as any) = (token: string, secretOrPublicKey: jwt.Secret, options: jwt.VerifyOptions & { complete: true }, cb: (err: null | Error, decoded: any) => void): void => {
                cb(null, JSON.stringify({ id: tokenId, type: TokenTypes.refresh, userId }));
            };
        });

        describe(`"user" method`, () => {

            describe("Exception Path", () => {
                it("If undefined passed as payload, should throw error", () => {

                    expect(() => tokenService.user(undefined as any)).rejects.toThrow(GenericError);
                    expect(() => tokenService.user(undefined as any)).rejects.toThrow("Payload is invalid");
                });

                it("If error occurs in signing jwt token, should throw error", async () => {

                    (jwt.sign as any) = (payload: string | object | Buffer, secretOrPrivateKey: jwt.Secret, options: jwt.SignOptions | undefined, cb: (err: null | Error, token: string | null) => void): void => {
                        cb(new Error("Something went wrong!"), null);
                    };

                    const tokenPayload: UserTokenPayload = {
                        id: mongooseHelper.getObjectId(),
                        type: TokenTypes.refresh,
                        userId: faker.random.alpha()
                    };

                    await expect(tokenService.user(tokenPayload)).rejects.toThrow("JWT token generation failed");
                });
            });

            describe("Happy Path", () => {
                it("Payload provided to generate token, should return token", async () => {

                    const tokenPayload: UserTokenPayload = {
                        id: tokenId.toString(),
                        type: TokenTypes.refresh,
                        userId: faker.random.alpha()
                    };

                    const token = await tokenService.user(tokenPayload);
                    expect(typeof token).toBe("string");
                });
            });
        });

        describe(`"verify" method`, () => {

            describe("Exception Path", () => {
                it("If undefined passed as token, should throw error", () => {
                    expect(() => tokenService.verify(undefined as any)).rejects.toThrow(GenericError);
                    expect(() => tokenService.verify(undefined as any)).rejects.toThrow("Token is invalid");
                });

                it("If invalid token provided, should throw error", () => {
                    (jwt.verify as any) = (token: string, secretOrPublicKey: jwt.Secret, options: jwt.VerifyOptions & { complete: true }, cb: (err: null | Error, decoded: any) => void): void => {
                        cb(new Error("Token is invalid"), null);
                    };

                    expect(() => tokenService.verify("some token")).rejects.toStrictEqual(new GenericError({ error: new Error("Token is invalid"), errorCode: 500 }))
                });
            });

            describe("Happy Path", () => {
                it("If valid token provided, should return decoded value", async () => {
                    const tokenPayload: UserTokenPayload = {
                        id: tokenId.toString(),
                        type: TokenTypes.refresh,
                        userId
                    };
                    const token = await tokenService.user(tokenPayload);
                    const isValidToken = await tokenService.verify(token);

                    expect(isValidToken).toStrictEqual(tokenPayload);
                });
            });
        });

        describe(`"refreshUser" method`, () => {
            describe("Exception Path", () => {
                it("If token not provided, should throw error", async () => {
                    await expect(() => tokenService.refreshUser(undefined as any)).rejects.toThrow("Token is invalid");
                });
            });

            describe("Happy Path", () => {
                it("If token provided as input and the token is stolen, should return stolen token true", async () => {
                    // const accessToken = faker.random.alphaNumeric();
                    // const refreshToken = faker.random.alphaNumeric();
                    const userDecodedPayload = {
                        id: mongooseHelper.getObjectId(),
                        type: TokenTypes.refresh,
                        userId: mongooseHelper.getObjectId()
                    };

                    jest.mock('./token.service', () => {
                        const mockTokenServiceImpl = jest.requireActual<typeof import('./token.service')>('./token.service').TokenServiceImpl;

                        mockTokenServiceImpl.prototype.user = mockUser;
                        mockTokenServiceImpl.prototype.verify = mockVerify;

                        return {
                            __esModule: true,
                            TokenServiceImpl: mockTokenServiceImpl
                        };
                    });

                    mockVerify.mockImplementation(() => userDecodedPayload);
                    // mockUser.mockImplementationOnce(() => accessToken);
                    // mockUser.mockImplementationOnce(() => refreshToken);
                    mockMarkStolenRefreshTokensIfStolen.mockImplementation(() => true);

                    const TokenService = require("./token.service");

                    const tokenService: TokenService = new TokenService.TokenServiceImpl();

                    const refreshTokenRes = await tokenService.refreshUser("JWT token here");

                    expect(mockVerify).toHaveBeenCalled();
                    // expect(mockUser).toHaveBeenCalledTimes(2);

                    expect(refreshTokenRes).toStrictEqual({
                        // refreshedTokens: {
                        //     accessToken,
                        //     refreshToken
                        // },
                        isStolenToken: true,
                        userDecodedPayload
                    });
                });

                it("If provided token is legit, should return refreshed tokens and payload", async () => {
                    const accessToken = faker.random.alphaNumeric();
                    const refreshToken = faker.random.alphaNumeric();
                    const userDecodedPayload = {
                        id: mongooseHelper.getObjectId(),
                        type: TokenTypes.refresh,
                        userId: mongooseHelper.getObjectId()
                    };

                    jest.mock('./token.service', () => {
                        const mockTokenServiceImpl = jest.requireActual<typeof import('./token.service')>('./token.service').TokenServiceImpl;

                        mockTokenServiceImpl.prototype.user = mockUser;
                        mockTokenServiceImpl.prototype.verify = mockVerify;

                        return {
                            __esModule: true,
                            TokenServiceImpl: mockTokenServiceImpl
                        };
                    });

                    mockVerify.mockImplementation(() => userDecodedPayload);
                    mockUser.mockImplementationOnce(() => accessToken);
                    mockUser.mockImplementationOnce(() => refreshToken);
                    mockMarkStolenRefreshTokensIfStolen.mockImplementation(() => false);

                    const TokenService = require("./token.service");

                    const tokenService: TokenService = new TokenService.TokenServiceImpl();

                    const refreshTokenRes = await tokenService.refreshUser("JWT token here");

                    expect(mockVerify).toHaveBeenCalled();
                    expect(mockUser).toHaveBeenCalledTimes(2);

                    expect(refreshTokenRes).toStrictEqual({
                        refreshedTokens: {
                            accessToken,
                            refreshToken
                        },
                        isStolenToken: false,
                        userDecodedPayload
                    });
                });
            });
        });
    });
});
