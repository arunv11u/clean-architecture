import { responseHandler } from "../../global-config";
import { AuthRepository, ResponseHandler } from "../../utils";


export class AuthRepoMongooseImpl implements AuthRepository {
    private _responseHandler: ResponseHandler;

    constructor() {
        this._responseHandler = responseHandler;
    };

    async guestLogin(): Promise<void> {
        throw this._responseHandler.internalError("Something went wrong!");
    };
};
