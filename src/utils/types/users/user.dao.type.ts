import { ClientSession } from "mongoose";
import { UserDoc } from "../../../users/models/user.model";

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
    save(userDetails: CreateUserInput, session?: ClientSession): Promise<UserDoc>;
    checkUserExists(userId: string): Promise<boolean>;
};

export {
    UserDAO,
    CreateUserInput
};
