import { ClientSession } from "mongoose";

interface CreateUserInput {
    name: string;
    email?: string;
    mobileNumber?: string;
};

interface UserDAO {
    save(userDetails: CreateUserInput, session?: ClientSession): Promise<void>;
};

export {
    UserDAO,
    CreateUserInput
};
