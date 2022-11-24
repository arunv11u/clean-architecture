import { BaseAuthRepository, BaseAuthService } from "../auth";
import { BaseUserDAO, BaseUserPipe, BaseUserService, BaseUserValidation } from "../users";


interface BaseMiddlewareFactory {
};

interface BaseValidationFactory {
    getUserValidation(): BaseUserValidation;
};

interface BaseServiceFactory {
    getUserService(): BaseUserService;
    getAuthService(): BaseAuthService;
};

interface BasePipeFactory {
    getUserPipe(): BaseUserPipe;
};

interface BaseHelperFactory {
};

interface BaseDAOFactory {
    getUserDAO(): BaseUserDAO;
};

interface BaseRepositoryFactory {
    getAuthRepository(): BaseAuthRepository;
};

export {
    BaseMiddlewareFactory,
    BaseValidationFactory,
    BaseServiceFactory,
    BasePipeFactory,
    BaseHelperFactory,
    BaseDAOFactory,
    BaseRepositoryFactory
};
