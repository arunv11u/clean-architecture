import { Response, NextFunction } from "express";
import { NCONF, Config, BaseHelperFactory, HelperFactory, BaseServiceFactory, ServiceFactory, BaseUserService } from "../../utils";


class UserService implements BaseUserService {

    private static _instance: BaseUserService;
    private _utilFactoryHelper: BaseHelperFactory = HelperFactory.getInstance();
    private _utilFactoryService: BaseServiceFactory = ServiceFactory.getInstance();
    private _nconf: NCONF;

    private constructor() {
        this._nconf = Config.getInstance().nconf;
    };

    static getInstance(): BaseUserService {
        if (!UserService._instance) UserService._instance = new UserService();

        return UserService._instance;
    };


};

export {
    UserService
};
