import { ClientSession, FilterQuery } from "mongoose";
import { UserDAO, CreateUserInput, DatabaseService, MongooseServiceImpl, ResponseHandlerImpl, ResponseHandler } from "../../utils";
import { User, UserDoc } from "../models/user.model";

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

    async checkUserExists(userId: string): Promise<boolean> {
        if (!userId) throw this._responseHandler.internalError("User Id is invalid");

        const query: FilterQuery<UserDoc> = { userId };
        const user = await this._mongooseService.findOne(User, query);

        if (user) return true;
        else return false;
    };
};
