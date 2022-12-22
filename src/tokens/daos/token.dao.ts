import mongoose, { ClientSession, Types } from "mongoose";
import { CreateTokenInput, ResponseHandler, TokenDAO, MongooseServiceImpl, DatabaseService, ResponseHandlerImpl } from "../../utils";
import { BuildToken, SaveTokenTypes, Token } from "../models/token.model";

export class TokenDAOMongooseImpl implements TokenDAO {
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
};
