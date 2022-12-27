import { faker } from '@faker-js/faker';
import mockMongooseServiceImpl, { mockSave, mockFindOne, mockUpdateMany } from '../../utils/services/__mocks__/mongoose.service.mock';
import mockMongooseHelperImpl, { mockGetObjectId } from '../../utils/helpers/__mocks__/mongoose.helper.mock';
import { CreateTokenInput, DatabaseService, GenericError, MongooseHelper, MongooseHelperImpl, MongooseServiceImpl, TokenDAO } from '../../utils';
import { SaveTokenTypes, Token, TokenDoc } from '../models/token.model';
import { TokenDAOImpl } from './token.dao';
import mongoose, { FilterQuery, Types, UpdateQuery } from 'mongoose';


jest.mock('../../utils', () => {
    const originalModule =
        jest.requireActual<typeof import('../../utils')>('../../utils');

    return {
        __esModule: true,
        ...originalModule,
        MongooseServiceImpl: mockMongooseServiceImpl,
        MongooseHelperImpl: mockMongooseHelperImpl
    };
});


describe("Token Component", () => {
    let tokenDAO: TokenDAO;
    let mongooseHelper: MongooseHelper;
    let databaseService: DatabaseService;

    beforeEach(() => {
        mongooseHelper = new MongooseHelperImpl();
        tokenDAO = new TokenDAOImpl();
        databaseService = new MongooseServiceImpl();

        const objectId = new mongoose.Types.ObjectId();
        mockGetObjectId.mockImplementation(() => objectId);
    });

    describe("DAO Module", () => {
        describe(`"saveRefreshToken" method`, () => {
            describe("Exception Path", () => {
                it("If undefined passed as an argument, should throw error", () => {
                    expect(() => tokenDAO.saveRefreshToken(undefined as any)).rejects.toThrow(GenericError);
                    expect(() => tokenDAO.saveRefreshToken(undefined as any)).rejects.toThrow("Token details is undefined in save token DAO, expected token details");
                });
            });

            describe("Happy Path", () => {
                it("Token details passed with out refresh token used, should save the token and id and refresh token used value should be same", async () => {

                    const objectId = mongooseHelper.getObjectId();

                    const tokenDetails: CreateTokenInput = {
                        user: mongooseHelper.getObjectId(),
                        value: faker.random.alphaNumeric(10)
                    };

                    await tokenDAO.saveRefreshToken(tokenDetails);

                    expect(mockMongooseServiceImpl).toHaveBeenCalled();
                    expect(mockSave).toHaveBeenCalled();

                    const tokenDetailsToBeSaved: TokenDoc = new Token({
                        _id: objectId,
                        type: SaveTokenTypes.refresh,
                        user: tokenDetails.user,
                        value: tokenDetails.value,
                        refreshTokenUsed: objectId
                    });

                    expect(mockSave).toHaveBeenCalledWith(tokenDetailsToBeSaved, { session: undefined });
                });

                it("Token details passed with refresh token used, should save the token", async () => {

                    const objectId = mongooseHelper.getObjectId();
                    const refreshTokenUsed = new mongoose.Types.ObjectId();

                    const tokenDetails: CreateTokenInput = {
                        user: mongooseHelper.getObjectId(),
                        value: faker.random.alphaNumeric(10),
                        refreshTokenUsed
                    };

                    await tokenDAO.saveRefreshToken(tokenDetails);

                    expect(mockMongooseServiceImpl).toHaveBeenCalled();
                    expect(mockSave).toHaveBeenCalled();

                    const tokenDetailsToBeSaved: TokenDoc = new Token({
                        _id: objectId,
                        type: SaveTokenTypes.refresh,
                        user: tokenDetails.user,
                        value: tokenDetails.value,
                        refreshTokenUsed
                    });

                    expect(mockSave).toHaveBeenCalledWith(tokenDetailsToBeSaved, { session: undefined });
                });
            });
        });

        describe(`"getRefreshToken" method`, () => {
            describe("Exception Path", () => {
                it("Id is undefined, should throw error", () => {
                    expect(() => tokenDAO.getRefreshToken(undefined as any)).rejects.toThrow("Id is undefined in get refresh token DAO, expected token id");
                });
            });

            describe("Happy Path", () => {
                it("Id is passed, should return token object", async () => {
                    const tokenDoc: TokenDoc = new Token({
                        _id: new mongoose.Types.ObjectId(),
                        type: SaveTokenTypes.refresh,
                        value: faker.random.alphaNumeric(10),
                        user: new mongoose.Types.ObjectId(),
                        refreshTokenUsed: new mongoose.Types.ObjectId(),
                        __v: 0
                    });
                    mockFindOne.mockImplementation(() => tokenDoc);

                    const tokenObj = await tokenDAO.getRefreshToken(new mongoose.Types.ObjectId());

                    expect(tokenObj).toStrictEqual(tokenDoc.toJSON());
                });
            });
        });

        describe(`"getStolenRefreshTokenIds" method`, () => {
            describe("Exception Path", () => {
                it("Id is undefined, should throw error", () => {
                    expect(() => tokenDAO.getStolenRefreshTokenIds(undefined as any)).rejects.toThrow("Id is undefined in get stolen refresh token ids in token DAO, expected token id");
                });
            });

            describe("Happy Path", () => {
                it("Stolen Id is passed, should return stolen refresh token ids if exists", async () => {
                    const mongooseServiceOriginalModule = jest.requireActual('../../utils/services/mongoose.service');
                    (MongooseServiceImpl as any) = mongooseServiceOriginalModule.MongooseServiceImpl;

                    const refreshTokenIds: Types.ObjectId[] = [
                        new mongoose.Types.ObjectId(),
                        new mongoose.Types.ObjectId(),
                        new mongoose.Types.ObjectId(),
                        new mongoose.Types.ObjectId()
                    ]; 

                    mockGetObjectId.mockImplementation(() => refreshTokenIds[0]);

                    const tokensData: TokenDoc[] = [
                        new Token({
                            _id: refreshTokenIds[0],
                            type: SaveTokenTypes.refresh,
                            user: new mongoose.Types.ObjectId(),
                            value: faker.random.alphaNumeric(10)
                        }),
                        new Token({
                            _id: refreshTokenIds[1],
                            type: SaveTokenTypes.refresh,
                            user: new mongoose.Types.ObjectId(),
                            value: faker.random.alphaNumeric(10),
                            refreshTokenUsed: refreshTokenIds[0]
                        }),
                        new Token({
                            _id: refreshTokenIds[2],
                            type: SaveTokenTypes.refresh,
                            user: new mongoose.Types.ObjectId(),
                            value: faker.random.alphaNumeric(10),
                            refreshTokenUsed: refreshTokenIds[1]
                        }),
                        new Token({
                            _id: new mongoose.Types.ObjectId(),
                            type: SaveTokenTypes.refresh,
                            user: new mongoose.Types.ObjectId(),
                            value: faker.random.alphaNumeric(10),
                            refreshTokenUsed: new mongoose.Types.ObjectId()
                        })
                    ];
                    await Token.insertMany(tokensData);

                    const tokenDAO = new TokenDAOImpl();
                    const stolenTokenIds = await tokenDAO.getStolenRefreshTokenIds(refreshTokenIds[0]);

                    const actualArray = [stolenTokenIds[0].toString(), stolenTokenIds[1].toString()];
                    const expectedArray = [refreshTokenIds[1].toString(), refreshTokenIds[2].toString()];
                    expect(actualArray.sort()).toStrictEqual(expectedArray.sort());

                    (MongooseServiceImpl as any) = mockMongooseServiceImpl;
                });

                it("No stolen tokens, should return empty array", async () => {
                    const mongooseServiceOriginalModule = jest.requireActual('../../utils/services/mongoose.service');
                    (MongooseServiceImpl as any) = mongooseServiceOriginalModule.MongooseServiceImpl;

                    const refreshTokenIds: Types.ObjectId[] = [
                        new mongoose.Types.ObjectId(),
                        new mongoose.Types.ObjectId(),
                    ]; 

                    mockGetObjectId.mockImplementation(() => refreshTokenIds[0]);

                    const tokensData: TokenDoc[] = [
                        new Token({
                            _id: refreshTokenIds[0],
                            type: SaveTokenTypes.refresh,
                            user: new mongoose.Types.ObjectId(),
                            value: faker.random.alphaNumeric(10)
                        }),
                        new Token({
                            _id: refreshTokenIds[1],
                            type: SaveTokenTypes.refresh,
                            user: new mongoose.Types.ObjectId(),
                            value: faker.random.alphaNumeric(10)
                        }),
                        new Token({
                            _id: refreshTokenIds[2],
                            type: SaveTokenTypes.refresh,
                            user: new mongoose.Types.ObjectId(),
                            value: faker.random.alphaNumeric(10)
                        })
                    ];
                    await Token.insertMany(tokensData);

                    const tokenDAO = new TokenDAOImpl();
                    const stolenTokens = await tokenDAO.getStolenRefreshTokenIds(refreshTokenIds[0]);
                    
                    expect(stolenTokens).toStrictEqual([]);

                    (MongooseServiceImpl as any) = mockMongooseServiceImpl;
                });
            });
        });

        describe(`"markStolenRefreshTokens" method`, () => {
            describe("Exception Path", () => {
                it("Token ids passed as undefined, should throw error", async () => {
                    expect(() => tokenDAO.markStolenRefreshTokens(undefined as any)).rejects.toThrow("Ids is undefined in mark stolen refresh tokens method in token DAO, expected token ids array");
                });
            });

            describe("Happy Path", () => {
                it("Token ids array passed as input, should mark the tokens as stolen", async () => {
                    const stolenTokenIds = [mongooseHelper.getObjectId(), mongooseHelper.getObjectId(), mongooseHelper.getObjectId()];

                    await tokenDAO.markStolenRefreshTokens(stolenTokenIds);

                    const expectedQuery: FilterQuery<TokenDoc> = { _id: { $in: stolenTokenIds } };
                    const expectedUpdatedQuery: UpdateQuery<TokenDoc> = { $set: { isStolen: true } }; 

                    expect(mockUpdateMany).toHaveBeenCalledWith(Token, expectedQuery, expectedUpdatedQuery, { session: undefined });
                });
            });
        });
    });
});
