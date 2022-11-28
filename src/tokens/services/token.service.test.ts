import { faker } from "@faker-js/faker";
import { UserTokenPayload, TokenService, GenericError } from "../../utils";
import { TokenServiceImpl } from "./token.service";


describe("Token Component", () => {
    describe("Token Service Module", () => {
        let tokenService: TokenService;

        beforeEach(() => {
            tokenService = new TokenServiceImpl();
        });

        describe(`"user" method`, () => {

            describe("Exception Path", () => {
                it("If undefined passed as payload, should throw error", () => {
                    expect(() => tokenService.user(undefined as any)).rejects.toThrow(GenericError);
                    expect(() => tokenService.user(undefined as any)).rejects.toThrow("Payload is invalid");
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
                    expect(() => tokenService.verify("some token")).rejects.toStrictEqual(new GenericError({error: new Error("Token is invalid"), errorCode: 500}))
                });
            });

            describe("Happy Path", () => {
                it("If valid token provided, should return decoded value", async () => {
                    const tokenPayload: UserTokenPayload = {
                        userId: faker.random.alphaNumeric(10)
                    };
                    const token = await tokenService.user(tokenPayload);
                    const isValidToken = await tokenService.verify(token);

                    expect(isValidToken).toStrictEqual(tokenPayload);
                });
            });
        });
    });
});
