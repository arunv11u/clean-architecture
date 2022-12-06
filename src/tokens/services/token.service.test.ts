import { faker } from "@faker-js/faker";
import jwt from 'jsonwebtoken';
import { UserTokenPayload, TokenService, GenericError } from "../../utils";
import { TokenServiceImpl } from "./token.service";

jest.mock("jsonwebtoken");

describe("Token Component", () => {
    describe("Token Service Module", () => {
        const userId = faker.random.alphaNumeric(8);
        let tokenService: TokenService;

        beforeEach(() => {
            tokenService = new TokenServiceImpl();

            (jwt.sign as any) = (payload: string | object | Buffer, secretOrPrivateKey: jwt.Secret, options: jwt.SignOptions | undefined, cb: (err: null | Error, token: string) => void): void => {
                cb(null, faker.random.alphaNumeric(12));
            };

            (jwt.verify as any) = (token: string, secretOrPublicKey: jwt.Secret, options: jwt.VerifyOptions & { complete: true }, cb: (err: null | Error, decoded: any) => void): void => {
                cb(null, { userId });
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
                        userId: faker.random.alpha()
                    };

                    await expect(tokenService.user(tokenPayload)).rejects.toThrow("JWT token generation failed");
                });
            });

            describe("Happy Path", () => {
                it("Payload provided to generate token, should return token", async () => {
                    const tokenPayload: UserTokenPayload = {
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
                    const tokenPayload: UserTokenPayload = { userId };
                    const token = await tokenService.user(tokenPayload);
                    const isValidToken = await tokenService.verify(token);

                    expect(isValidToken).toStrictEqual(tokenPayload);
                });
            });
        });
    });
});
