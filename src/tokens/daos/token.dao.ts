import mongoose, { ClientSession, Types } from "mongoose";
import { CreateTokenInput, ResponseHandler, TokenDAO, MongooseServiceImpl, DatabaseService, ResponseHandlerImpl, RefreshTokenData, TokenTypes } from "../../utils";
import { BuildToken, SaveTokenTypes, Token, TokenObj } from "../models/token.model";

export class TokenDAOImpl implements TokenDAO {
    private _responseHandler: ResponseHandler;
    private _mongooseService: DatabaseService;

    constructor() {
        this._responseHandler = new ResponseHandlerImpl();
        this._mongooseService = new MongooseServiceImpl();
    };

    async saveRefreshToken(tokenDetails: CreateTokenInput, session?: ClientSession): Promise<void> {
        if (!tokenDetails) throw this._responseHandler.internalError("Token details is undefined in save token DAO, expected token details");

        const tokenId: string | Types.ObjectId = new mongoose.Types.ObjectId();
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
};
