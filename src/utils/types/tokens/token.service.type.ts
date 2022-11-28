
interface TokenPayload {
    userId: string;
};

interface TokenService {
    get(payload: TokenPayload): Promise<string>;
};

export {
    TokenPayload,
    TokenService
};
