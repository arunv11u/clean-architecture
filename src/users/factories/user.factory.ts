import { UserDAO, UserFactory, UserPipe, UserService, UserValidation } from "../../utils";
import { UserDAOMongooseImpl } from "../daos/user.dao";
import { UserPipeImpl } from "../pipes/user.pipe";
import { UserServiceImpl } from "../services/user.service";
import { UserValidationImpl } from "../validations/user.validation";

export class UserFactoryImpl implements UserFactory {

    private _userValidation: UserValidation = new UserValidationImpl();
    private _userPipe: UserPipe = new UserPipeImpl();
    private _userService: UserService = new UserServiceImpl();
    private _userDAO: UserDAO = new UserDAOMongooseImpl();

    constructor() { };

    getValidation(): any {
        return this._userValidation;
    };

    getPipe(): any {
        return this._userPipe;
    };

    getService(): any {
        return this._userService;
    };

    getDAO(): UserDAO {
        return this._userDAO;
    };
};
