import { Types } from "mongoose";
import { TokenTypes } from "./enums";

interface UserTokenPayload {
    id: string | Types.ObjectId;
    type: TokenTypes;
    userId: string | Types.ObjectId;
};

interface UserDecodedPayload extends UserTokenPayload {};

interface Tokens {
    accessToken: string;
    refreshToken: string;
};

interface UserRefreshTokenRes {
    tokens: Tokens;
    userDecodedPayload: UserDecodedPayload
};

interface TokenService {
    user(payload: UserTokenPayload): Promise<string>;
    verify(token: string): Promise<UserDecodedPayload>;
    refreshUser(token: string): Promise<UserRefreshTokenRes>;
};

export {
    UserTokenPayload,
    UserDecodedPayload,
    Tokens,
    TokenService,
    UserRefreshTokenRes
};
