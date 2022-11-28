import { ClientSession } from "mongoose";
import { UserDAO, CreateUserInput, DatabaseService, MongooseServiceImpl, ResponseHandlerImpl, ResponseHandler } from "../../utils";
import { User } from "../models/user.model";

export class UserDAOMongooseImpl implements UserDAO {
    private _responseHandler: ResponseHandler;
    private _mongooseService: DatabaseService;

    constructor() {
        this._responseHandler = new ResponseHandlerImpl();
        this._mongooseService = new MongooseServiceImpl();
    };

    async save(userDetails: CreateUserInput, session?: ClientSession): Promise<void> {
        if (!userDetails) throw this._responseHandler.internalError("User details is undefined in create user DAO, expected user details");

        const user = new User(userDetails);
        await this._mongooseService.save(user, { session });
    };
};

// export const userDAO = new UserDAOMongooseImpl();