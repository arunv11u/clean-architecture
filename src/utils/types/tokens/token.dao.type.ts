import { ClientSession, Types } from "mongoose";

interface CreateTokenInput {
    value: string;
};

interface TokenDAO {
    save(tokenDetails: CreateTokenInput & { user: Types.ObjectId | string }, session?: ClientSession): Promise<void>;
};

export {
    CreateTokenInput,
    TokenDAO
};
