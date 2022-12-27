import { ClientSession, Types } from "mongoose";


export interface TokenRepository {
    markStolenRefreshTokensIfStolen(id: string | Types.ObjectId, session?: ClientSession): Promise<boolean>;
};
