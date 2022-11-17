import { BaseUserPipe, BaseUserService, BaseUserValidation } from "../users";


interface BaseMiddlewareFactory {
};

interface BaseValidationFactory {
    getUserValidation(): BaseUserValidation;
};

interface BaseServiceFactory {
    getUserService(): BaseUserService;
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
