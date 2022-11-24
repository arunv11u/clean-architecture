
interface CreateUserInput {
    name: string;
    email?: string;
    mobileNumber?: string;
};

interface BaseUserDAO {
    create(userDetails: CreateUserInput): Promise<void>;
};

export {
    BaseUserDAO,
    CreateUserInput
};
