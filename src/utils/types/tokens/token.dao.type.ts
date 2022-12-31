import { ClientSession, Types } from "mongoose";
import { SaveTokenTypes } from "../../../tokens/models/token.model";

interface CreateTokenInput {
    user: Types.ObjectId | string;
    refreshTokenUsed?: string | Types.ObjectId;
    value: string;
};

interface BaseToken {
    id: string | Types.ObjectId;
    value: string;
    user: string | Types.ObjectId;
    isStolen: boolean;
    isDeleted: boolean;
    creationDate: Date;
    lastModifiedDate: Date;
    version: number;
};

interface RefreshToken extends BaseToken {
    type: SaveTokenTypes.refresh,
    refreshTokenUsed?: string | Types.ObjectId;
};

interface TokenDAO {
    saveRefreshToken(tokenDetails: CreateTokenInput, session?: ClientSession): Promise<void>;
    getRefreshToken(id: string | Types.ObjectId, session?: ClientSession): Promise<RefreshToken>;
    getStolenRefreshTokenIds(id: string | Types.ObjectId, session?: ClientSession): Promise<Types.ObjectId[]>;
    markStolenRefreshTokens(ids: string | Types.ObjectId[], session?: ClientSession): Promise<void>;
    softDeleteRefreshToken(id: string | Types.ObjectId, session?: ClientSession): Promise<void>;
};

export {
    CreateTokenInput,
    RefreshToken,
    TokenDAO
};
