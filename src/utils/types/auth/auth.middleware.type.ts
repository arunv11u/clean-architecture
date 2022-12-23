import { RequestHandler } from 'express';
import { Tokens, UserDecodedPayload } from '../tokens';

interface ValidateTokenRes {
    refreshedTokens?: Tokens;
    isStolenToken?: boolean;
    userDecodedPayload?: UserDecodedPayload;
};

interface AuthMiddleware {
    checkAuthorization(): RequestHandler;
};

export {
    ValidateTokenRes,
    AuthMiddleware
};
