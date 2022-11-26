import { responseHandler } from "../../global-config";
import { UserDAO, CreateUserInput, ResponseHandler, DatabaseService, MongooseServiceImpl } from "../../utils";

export class UserDAOMongooseImpl implements UserDAO {
    private _responseHandler: ResponseHandler;
    private _mongooseService: DatabaseService;

    constructor() {
        this._responseHandler = responseHandler;
        this._mongooseService = new MongooseServiceImpl();
    };

    async save(userDetails: CreateUserInput): Promise<void> {
        if (!userDetails) throw this._responseHandler.internalError("User details is undefined in create user DAO, expected user details");

        await this._mongooseService.save({} as any);
    };
};
