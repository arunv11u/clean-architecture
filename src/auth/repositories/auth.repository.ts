import { BaseAuthRepository, BaseResponseHandler, ResponseHandler } from "../../utils";


export class AuthRepository implements BaseAuthRepository {
    private static _instance: BaseAuthRepository;
    private _responseHandler: BaseResponseHandler;

    private constructor() { 
        this._responseHandler = ResponseHandler.getInstance();
    };

    static getInstance(): BaseAuthRepository {
        if (!AuthRepository._instance) AuthRepository._instance = new AuthRepository();

        return AuthRepository._instance;
    };

    async guestLogin(): Promise<void> {
        throw this._responseHandler.internalError("Something went wrong!");
    };
};
