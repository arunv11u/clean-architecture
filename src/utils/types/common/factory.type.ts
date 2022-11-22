import { BaseAuthService } from "../auth";
import { BaseUserPipe, BaseUserService, BaseUserValidation } from "../users";


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

export {
    BaseMiddlewareFactory,
    BaseValidationFactory,
    BaseServiceFactory,
    BasePipeFactory,
    BaseHelperFactory
};
