import { ClientSession, Types } from "mongoose";
import { SaveTokenTypes } from "../../../tokens/models/token.model";

interface CreateTokenInput {
    user: Types.ObjectId | string;
    refreshTokenUsed: string | Types.ObjectId;
    value: string;
};

interface BaseTokenData {
    id: string | Types.ObjectId;
    value: string;
    user: string | Types.ObjectId;
    isDeleted: boolean;
    creationDate: Date;
    lastModifiedDate: Date;
    version: number;
};

interface RefreshTokenData extends BaseTokenData {
    type: SaveTokenTypes.refresh,
    refreshTokenUsed: string | Types.ObjectId;
};

interface TokenDAO {
    saveRefreshToken(tokenDetails: CreateTokenInput, session?: ClientSession): Promise<void>;
    getRefreshToken(id: string | Types.ObjectId, session?: ClientSession): Promise<RefreshTokenData>;
};

export {
    CreateTokenInput,
    RefreshTokenData,
    TokenDAO
};
