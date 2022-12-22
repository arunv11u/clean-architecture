import mongoose, { ClientSession } from "mongoose";
import { UserDoc, UserObj } from "../../../users/models/user.model";

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
    save(userDetails: CreateUserInput, session?: ClientSession): Promise<UserObj>;
    checkUserExists(userId: string): Promise<boolean>;
    findById(id: string | mongoose.Types.ObjectId, session?: ClientSession): Promise<UserObj>;
};

export {
    UserDAO,
    CreateUserInput
};
