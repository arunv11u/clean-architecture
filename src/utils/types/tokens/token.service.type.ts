
interface UserTokenPayload {
    userId: string;
};

interface UserDecodedPayload extends UserTokenPayload {};

interface TokenService {
    user(payload: UserTokenPayload): Promise<string>;
    verify(token: string): Promise<UserDecodedPayload>;
};

export {
    UserTokenPayload,
    UserDecodedPayload,
    TokenService
};
