
interface CreateTokenInput {
    value: string;
};

interface TokenDAO {
    save(tokenDetails: CreateTokenInput): Promise<void>;
};

export {
    CreateTokenInput,
    TokenDAO
};
