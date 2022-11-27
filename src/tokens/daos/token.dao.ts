import { responseHandler } from "../../global-config";
import { CreateTokenInput, ResponseHandler, TokenDAO, MongooseServiceImpl, DatabaseService } from "../../utils";
import { Token } from "../models/token.model";

export class TokenDAOImpl implements TokenDAO {
    private _responseHandler: ResponseHandler;
    private _mongooseService: DatabaseService;

    constructor() { 
        this._responseHandler = responseHandler;
        this._mongooseService = new MongooseServiceImpl();
    };

    async save(tokenDetails: CreateTokenInput): Promise<void> {
        if (!tokenDetails) throw this._responseHandler.internalError("Token details is undefined in save token DAO, expected token details");
        
        const token = new Token(tokenDetails);
        await this._mongooseService.save(token);
    };
};
