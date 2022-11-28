import { ClientSession } from "mongoose";

interface CreateTokenInput {
    value: string;
};

interface TokenDAO {
    save(tokenDetails: CreateTokenInput, session?: ClientSession): Promise<void>;
};

export {
    CreateTokenInput,
    TokenDAO
};
