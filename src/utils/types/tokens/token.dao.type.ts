import { ClientSession, Types } from "mongoose";
import { TokenTypes } from "./enums";

interface CreateTokenInput {
    type: TokenTypes;
    value: string;
};

interface TokenDAO {
    save(tokenDetails: CreateTokenInput & { user: Types.ObjectId | string }, session?: ClientSession): Promise<void>;
};

export {
    CreateTokenInput,
    TokenDAO
};
