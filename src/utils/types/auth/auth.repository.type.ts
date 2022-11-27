import { CreateTokenInput } from "../tokens";
import { CreateUserInput } from "../users";

interface GuestLoginInput {
    user: CreateUserInput;
    token: CreateTokenInput;
};

interface AuthRepository {
    guestLogin(data: GuestLoginInput): Promise<void>;
};

export {
    GuestLoginInput,
    AuthRepository
};
