import { ClientSession } from "mongoose";

interface UserPhone {
    code: string;
    number: string;
};

interface CreateUserInput {
    name: string;
    userId: string;
    email?: string;
    phone?: UserPhone;
};

interface UserDAO {
    save(userDetails: CreateUserInput, session?: ClientSession): Promise<void>;
    checkUserExists(userId: string): Promise<boolean>;
};

export {
    UserDAO,
    CreateUserInput
};
