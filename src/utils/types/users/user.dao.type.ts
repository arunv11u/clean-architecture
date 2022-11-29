import { ClientSession } from "mongoose";

interface CreateUserInput {
    name: string;
    userId: string;
    email?: string;
    mobileNumber?: string;
};

interface UserDAO {
    save(userDetails: CreateUserInput, session?: ClientSession): Promise<void>;
    checkUserExists(userId: string): Promise<boolean>;
};

export {
    UserDAO,
    CreateUserInput
};
