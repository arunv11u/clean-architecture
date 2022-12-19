import { TokenTypes } from "./enums";

interface UserTokenPayload {
    type: TokenTypes;
    userId: string;
};

interface UserDecodedPayload extends UserTokenPayload {};

interface Tokens {
    authToken: string;
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
