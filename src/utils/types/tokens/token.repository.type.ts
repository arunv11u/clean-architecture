import { ClientSession, Types } from "mongoose";


export interface TokenRepository {
    expireRefreshTokensIfStolen(id: string | Types.ObjectId, session?: ClientSession): Promise<boolean>;
};
