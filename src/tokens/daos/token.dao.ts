import { PipelineStage, ClientSession, FilterQuery, Types, UpdateQuery } from "mongoose";
import { CreateTokenInput, ResponseHandler, TokenDAO, MongooseServiceImpl, DatabaseService, ResponseHandlerImpl, RefreshTokenData, TokenTypes, MongooseHelper, MongooseHelperImpl } from "../../utils";
import { BuildToken, SaveTokenTypes, Token, TokenDoc, TokenObj } from "../models/token.model";

export class TokenDAOImpl implements TokenDAO {
    private _responseHandler: ResponseHandler;
    private _mongooseService: DatabaseService;
    private _mongooseHelper: MongooseHelper;

    constructor() {
        this._responseHandler = new ResponseHandlerImpl();
        this._mongooseService = new MongooseServiceImpl();
        this._mongooseHelper = new MongooseHelperImpl();
    };

    async saveRefreshToken(tokenDetails: CreateTokenInput, session?: ClientSession): Promise<void> {
        if (!tokenDetails) throw this._responseHandler.internalError("Token details is undefined in save token DAO, expected token details");

        const tokenId: string | Types.ObjectId = this._mongooseHelper.getObjectId();
        const refreshtokenAttrs: BuildToken = {
            _id: tokenId,
            type: SaveTokenTypes.refresh,
            user: tokenDetails.user,
            value: tokenDetails.value,
            refreshTokenUsed: tokenDetails.refreshTokenUsed ?? tokenId
        };

        const token = Token.build(refreshtokenAttrs);

        await this._mongooseService.save(token, { session });
    };

    async getRefreshToken(id: string | Types.ObjectId, session?: ClientSession): Promise<RefreshTokenData> {
        if (!id) throw this._responseHandler.internalError("Id is undefined in get refresh token DAO, expected token id");

        const token = await this._mongooseService.findOne(Token, { _id: id, type: TokenTypes.refresh }, { session });
        const tokenObj = Token.jsonObj(token) as TokenObj;

        return tokenObj as RefreshTokenData;
    };

    async getStolenRefreshTokenIds(id: string | Types.ObjectId, session?: ClientSession | undefined): Promise<Types.ObjectId[]> {
        if (!id) throw this._responseHandler.internalError("Id is undefined in get stolen refresh token ids in token DAO, expected token id");

        const stolenRefreshTokensMatch: PipelineStage.Match = {
            $match: {
                $expr: {
                    $eq: ["$refreshTokenUsed", this._mongooseHelper.getObjectId(id)]
                }
            }
        };
        const stolenrefreshTokensLookup: PipelineStage.GraphLookup = {
            $graphLookup: {
                from: 'tokens',
                startWith: "$_id",
                connectFromField: "_id",
                connectToField: "refreshTokenUsed",
                as: 'stolenRefreshTokens'
            }
        };

        const addFieldsStolenTokens: PipelineStage.AddFields = {
            $addFields: {
                "stolenRefreshTokens": { $concatArrays: [["$_id"], "$stolenRefreshTokens._id"] }
            }
        };

        const unwindTokens: PipelineStage.Unwind = {
            $unwind: {
                path: "$stolenRefreshTokens",
                preserveNullAndEmptyArrays: true
            }
        };

        const groupStolenTokens: PipelineStage.Group = {
            $group: {
                _id: null,
                tokens: { $addToSet: "$stolenRefreshTokens" }
            }
        };

        const pipelines: PipelineStage[] = [
            stolenRefreshTokensMatch,
            stolenrefreshTokensLookup,
            addFieldsStolenTokens,
            unwindTokens,
            groupStolenTokens
        ];

        const tokenRes = await this._mongooseService.aggregate(Token, pipelines);

        let tokens = [];
        if (tokenRes.length && tokenRes[0] && tokenRes[0].tokens) tokens = tokenRes[0].tokens;

        return tokens;
    };

    async markStolenRefreshTokens(ids: string | Types.ObjectId[], session?: ClientSession | undefined): Promise<void> {
        if (!ids) throw this._responseHandler.internalError("Ids is undefined in mark stolen refresh tokens method in token DAO, expected token ids array");

        const query: FilterQuery<TokenDoc> = { _id: { $in: ids } };
        const updateQuery: UpdateQuery<TokenDoc> = { $set: { isStolen: true } };

        await this._mongooseService.updateMany(Token, query, updateQuery, { session });
    };

    async softDeleteRefreshToken(id: string | Types.ObjectId, session?: ClientSession | undefined): Promise<void> {
        if (!id) throw this._responseHandler.internalError("Id is undefined in soft delete refresh token method in token DAO, expected token id");

        const query: FilterQuery<TokenDoc> = { _id: id };
        const updateQuery: UpdateQuery<TokenDoc> = { $set: { isDeleted: true } };

        await this._mongooseService.updateOne(Token, query, updateQuery, session);
    };
};
