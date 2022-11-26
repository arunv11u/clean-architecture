
interface CreateUserInput {
    name: string;
    email?: string;
    mobileNumber?: string;
};

interface UserDAO {
    save(userDetails: CreateUserInput): Promise<void>;
};

export {
    UserDAO,
    CreateUserInput
};
