import { RequestHandler } from 'express';
import { Tokens, UserDecodedPayload } from '../tokens';

interface ValidateTokenRes {
    tokens?: Tokens;
    userDecodedPayload: UserDecodedPayload;
};

interface AuthMiddleware {
    checkAuthorization(): RequestHandler;
};

export {
    ValidateTokenRes,
    AuthMiddleware
};
