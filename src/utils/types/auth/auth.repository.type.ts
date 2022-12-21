import { ClientSession } from "mongoose";
import { CreateTokenInput } from "../tokens";
import { CreateUserInput } from "../users";

interface GuestLoginInput {
    user: CreateUserInput;
};

interface AuthRepository {
    guestLogin(data: GuestLoginInput, session?: ClientSession): Promise<void>;
};

export {
    GuestLoginInput,
    AuthRepository
};
