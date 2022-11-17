import { UserService } from "../../users";
import { BaseUserService, BaseServiceFactory } from "../types";

class ServiceFactory implements BaseServiceFactory {

    private static _instance: BaseServiceFactory;

    private constructor() { };

    static getInstance(): BaseServiceFactory {
        if (!ServiceFactory._instance) ServiceFactory._instance = new ServiceFactory();

        return ServiceFactory._instance;
    };

    getUserService(): BaseUserService {
        return UserService.getInstance();
    };

};

export {
    ServiceFactory
};
