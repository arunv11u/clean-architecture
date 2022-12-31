import { ClientSession, Types } from "mongoose";
import { ResponseHandler, ResponseHandlerImpl, TokenDAO, TokenRepository } from "../../utils";
import { TokenDAOImpl } from "../daos/token.dao";


export class TokenRepositoryImpl implements TokenRepository {
    private _tokenDAO: TokenDAO;
    private _responseHandler: ResponseHandler;

    constructor() {
        this._tokenDAO = new TokenDAOImpl();
        this._responseHandler = new ResponseHandlerImpl();
    };

    async markStolenRefreshTokensIfStolen(id: string | Types.ObjectId, session?: ClientSession): Promise<boolean> {
        if (!id) throw this._responseHandler.internalError("Id is undefined in mark stolen refresh tokens if stolen method in token repository, expected Object Id");

        let isStolenToken: boolean = false;
        const refreshToken = await this._tokenDAO.getRefreshToken(id, session);

        if (!refreshToken) throw this._responseHandler.clientError("Token is invalid");

        if (refreshToken.refreshTokenUsed) {
            const stolenTokenIds = await this._tokenDAO.getStolenRefreshTokenIds(id, session);

            await this._tokenDAO.markStolenRefreshTokens(stolenTokenIds, session);

            isStolenToken = true;
        } else if (refreshToken.isStolen) isStolenToken = true;
        else isStolenToken = false;


        return isStolenToken;
    };
};
