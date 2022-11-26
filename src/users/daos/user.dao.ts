import { responseHandler } from "../../global-config";
import { UserDAO, CreateUserInput, ResponseHandler } from "../../utils";


export class UserDAOMongooseImpl implements UserDAO {
    private _responseHandler: ResponseHandler

    constructor() {
        this._responseHandler = responseHandler;
    };

    async save(userDetails: CreateUserInput): Promise<void> {
        if (!userDetails) throw this._responseHandler.internalError("User details is undefined in create user DAO, expected user details");


    };
};
