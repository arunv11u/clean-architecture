import { ClientSession, FilterQuery, Types } from "mongoose";
import { UserDAO, CreateUserInput, DatabaseService, MongooseServiceImpl, ResponseHandlerImpl, ResponseHandler } from "../../utils";
import { User, UserDoc, UserObj } from "../models/user.model";


export class UserDAOImpl implements UserDAO {
    private _responseHandler: ResponseHandler;
    private _mongooseService: DatabaseService;

    constructor() {
        this._responseHandler = new ResponseHandlerImpl();
        this._mongooseService = new MongooseServiceImpl();
    };

    async save(userDetails: CreateUserInput, session?: ClientSession): Promise<UserObj> {
        if (!userDetails) throw this._responseHandler.internalError("User details is undefined in create user DAO, expected user details");

        (userDetails as any).excludeLocals = true;
        const user = new User(userDetails);
        
        const newUser = await this._mongooseService.save(user, { session });

        const userObj = User.jsonObj(newUser as UserDoc) as UserObj;

        return userObj;
    };

    async checkUserExists(userId: string): Promise<boolean> {
        if (!userId) throw this._responseHandler.internalError("User Id is invalid");

        const query: FilterQuery<UserDoc> = { userId };
        const user = await this._mongooseService.findOne(User, query);

        if (user) return true;
        else return false;
    };

    async findById(id: string | Types.ObjectId, session?: ClientSession | undefined): Promise<UserObj> {
        if (!id) throw this._responseHandler.internalError("Id is invalid");
        
        const query: FilterQuery<UserDoc> = { _id: id };
        const user = await this._mongooseService.findOne(User, query, { session });

        if (!user) throw this._responseHandler.notFound("User not found");

        const userObj = User.jsonObj(user) as UserObj;

        return userObj;
    };
};
