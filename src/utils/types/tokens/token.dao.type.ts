import { ClientSession, Types } from "mongoose";

interface CreateTokenInput {
    user: Types.ObjectId | string;
    refreshTokenUsed: string | Types.ObjectId;
    value: string;
};

interface TokenDAO {
    saveRefreshToken(tokenDetails: CreateTokenInput, session?: ClientSession): Promise<void>;
};

export {
    CreateTokenInput,
    TokenDAO
};
