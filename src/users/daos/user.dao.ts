import { BaseResponseHandler, BaseUserDAO, CreateUserInput, ResponseHandler } from "../../utils";


export class UserDAO implements BaseUserDAO {
    private static _instance: BaseUserDAO;
    private _responseHandler: BaseResponseHandler

    private constructor() {
        this._responseHandler = ResponseHandler.getInstance();
    };

    static getInstance(): BaseUserDAO {
        if (!UserDAO._instance) UserDAO._instance = new UserDAO();

        return UserDAO._instance;
    };

    async create(userDetails: CreateUserInput): Promise<void> {
        if (!userDetails) throw this._responseHandler.internalError("User details is undefined in create user DAO, expected user details");


    };
};
