import { UserDAO, UserFactory, UserPipe, UserService, UserValidation } from "../../utils";
import { UserDAOMongooseImpl } from "../daos/user.dao";
import { UserPipeImpl } from "../pipes/user.pipe";
import { UserServiceImpl } from "../services/user.service";
import { UserValidationImpl } from "../validations/user.validation";


export class UserFactoryImpl implements UserFactory {

    constructor() { };

    getValidation(): UserValidation {
        return new UserValidationImpl();
    };

    getPipe(): UserPipe {
        return new UserPipeImpl();
    };

    getService(): UserService {
        return new UserServiceImpl();
    };

    getDAO(): UserDAO {
        return new UserDAOMongooseImpl();
    };
};
