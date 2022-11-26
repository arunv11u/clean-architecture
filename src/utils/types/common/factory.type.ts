import { AuthRepository, AuthService } from "../auth";
import { UserDAO, UserPipe, UserService, UserValidation } from "../users";



interface MiddlewareFactory {
};

interface ValidationFactory {
    getUserValidation(): UserValidation;
};

interface ServiceFactory {
    getUserService(): UserService;
    getAuthService(): AuthService;
};

interface PipeFactory {
    getUserPipe(): UserPipe;
};

interface HelperFactory {
};

interface DAOFactory {
    getUserDAO(): UserDAO;
};

interface RepositoryFactory {
    getAuthRepository(): AuthRepository;
};

export {
    MiddlewareFactory,
    ValidationFactory,
    ServiceFactory,
    PipeFactory,
    HelperFactory,
    DAOFactory,
    RepositoryFactory
};
