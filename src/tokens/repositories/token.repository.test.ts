import { faker } from "@faker-js/faker";
import { MongooseHelper, MongooseHelperImpl, RefreshTokenData, TokenRepository } from "../../utils";
import mockTokenDAOImpl, { mockGetRefreshToken, mockGetStolenRefreshTokenIds, mockMarkStolenRefreshTokens } from "../daos/__mocks__/token.dao.mock";
import { SaveTokenTypes } from "../models/token.model";
import { TokenRepositoryImpl } from "./token.repository";

jest.mock('../daos/token.dao', () => {
    const originalModule =
        jest.requireActual<typeof import('../daos/token.dao')>('../daos/token.dao');

    return {
        __esModule: true,
        ...originalModule,
        TokenDAOImpl: mockTokenDAOImpl
    };
});

describe("Token Component", () => {
    describe("Token Repository", () => {
        let tokenRespository: TokenRepository;
        let mongooseHelper: MongooseHelper;

        beforeEach(() => {
            tokenRespository = new TokenRepositoryImpl();
            mongooseHelper = new MongooseHelperImpl();
        });

        describe(`"markStolenRefreshTokensIfStolen" method`, () => {
            describe("Exception Path", () => {
                it("Id is passed as undefined, should throw error", () => {
                    expect(() => tokenRespository.markStolenRefreshTokensIfStolen(undefined as any)).rejects.toThrow("Id is undefined in mark stolen refresh tokens if stolen method in token repository, expected Object Id");
                });

                it("Refresh token not found in db, should throw error", async () => {
                    mockGetRefreshToken.mockImplementation(() => null);

                    await expect(() => tokenRespository.markStolenRefreshTokensIfStolen("Refresh Token")).rejects.toThrow("Token is invalid");
                });
            });

            describe("Happy Path", () => {
                it("Token id is passed and token is not stolen, should return false", async () => {
                    const expectedRefreshTokenData: RefreshTokenData = {
                        id: mongooseHelper.getObjectId(),
                        value: faker.random.alphaNumeric(10),
                        user: mongooseHelper.getObjectId(),
                        type: SaveTokenTypes.refresh,
                        isStolen: false,
                        isDeleted: false,
                        creationDate: new Date(),
                        lastModifiedDate: new Date(),
                        version: 0
                    };

                    mockGetRefreshToken.mockImplementation(() => expectedRefreshTokenData);

                    const isStolenToken = await tokenRespository.markStolenRefreshTokensIfStolen(mongooseHelper.getObjectId());

                    expect(mockGetRefreshToken).toHaveBeenCalled();
                    expect(mockGetStolenRefreshTokenIds).not.toHaveBeenCalled();
                    expect(mockMarkStolenRefreshTokens).not.toHaveBeenCalled();
                    expect(isStolenToken).toBe(false);
                });

                it("Stolen token id is passed as input, should mark the stolen tokens as true and return true", async () => {
                    const stolenTokenId = mongooseHelper.getObjectId();
                    const stolenRefreshTokenIds = [mongooseHelper.getObjectId()];
                    const expectedRefreshTokenData: RefreshTokenData = {
                        id: stolenTokenId,
                        value: faker.random.alphaNumeric(10),
                        user: mongooseHelper.getObjectId(),
                        type: SaveTokenTypes.refresh,
                        refreshTokenUsed: stolenTokenId,
                        isStolen: false,
                        isDeleted: false,
                        creationDate: new Date(),
                        lastModifiedDate: new Date(),
                        version: 0
                    };

                    mockGetRefreshToken.mockImplementation(() => expectedRefreshTokenData);
                    mockGetStolenRefreshTokenIds.mockImplementation(() => stolenRefreshTokenIds);

                    const isStolenToken = await tokenRespository.markStolenRefreshTokensIfStolen(stolenTokenId);

                    expect(mockGetRefreshToken).toHaveBeenCalledWith(stolenTokenId, undefined);
                    expect(mockGetStolenRefreshTokenIds).toHaveBeenCalledWith(stolenTokenId, undefined);
                    expect(mockMarkStolenRefreshTokens).toHaveBeenCalledWith(stolenRefreshTokenIds, undefined);
                    expect(isStolenToken).toBe(true);
                });

                it("Stolen token id is passed which is already been realized as an stolen token, should return true", async () => {
                    const stolenTokenId = mongooseHelper.getObjectId();
                    const expectedRefreshTokenData: RefreshTokenData = {
                        id: stolenTokenId,
                        value: faker.random.alphaNumeric(10),
                        user: mongooseHelper.getObjectId(),
                        type: SaveTokenTypes.refresh,
                        isStolen: true,
                        isDeleted: false,
                        creationDate: new Date(),
                        lastModifiedDate: new Date(),
                        version: 0
                    };

                    mockGetRefreshToken.mockImplementation(() => expectedRefreshTokenData);

                    const isStolenToken = await tokenRespository.markStolenRefreshTokensIfStolen(stolenTokenId);

                    expect(mockGetRefreshToken).toHaveBeenCalledWith(stolenTokenId, undefined);
                    expect(mockGetStolenRefreshTokenIds).not.toHaveBeenCalled();
                    expect(mockMarkStolenRefreshTokens).not.toHaveBeenCalled();
                    expect(isStolenToken).toBe(true);
                });
            });
        });
    });
});