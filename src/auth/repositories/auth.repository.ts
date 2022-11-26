import { AuthRepository, ResponseHandler, ResponseHandlerImpl } from "../../utils";


export class AuthRepoMongooseImpl implements AuthRepository {
    private _responseHandler: ResponseHandler;

    constructor() {
        this._responseHandler = new ResponseHandlerImpl();
    };

    async guestLogin(): Promise<void> {
        throw this._responseHandler.internalError("Something went wrong!");
    };
};
