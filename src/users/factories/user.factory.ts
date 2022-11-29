import { UserDAO, UserFactory, UserPipe, UserService, UserValidation } from "../../utils";
import { UserDAOMongooseImpl } from "../daos/user.dao";
import { UserPipeImpl } from "../pipes/user.pipe";
import { UserServiceImpl } from "../services/user.service";
import { UserValidationImpl } from "../validations/user.validation";

export class UserFactoryImpl implements UserFactory {

    private _userValidation: UserValidation;
    private _userPipe: UserPipe;
    private _userService: UserService;
    private _userDAO: UserDAO;

    constructor() {
        this._userValidation = new UserValidationImpl();
        this._userPipe = new UserPipeImpl();
        this._userService = new UserServiceImpl();
        this._userDAO = new UserDAOMongooseImpl();
    };

    getValidation(): UserValidation {
        return this._userValidation;
    };

    getPipe(): UserPipe {
        return this._userPipe;
    };

    getService(): UserService {
        return this._userService;
    };

    getDAO(): UserDAO {
        return this._userDAO;
    };
};
