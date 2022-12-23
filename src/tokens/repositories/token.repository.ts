import { ClientSession, Types } from "mongoose";
import { TokenRepository } from "../../utils";


export class TokenRepositoryImpl implements TokenRepository {

    constructor() { };

    async expireRefreshTokensIfStolen(id: string | Types.ObjectId, session?: ClientSession): Promise<boolean> {
        
        return false;
    };
};
