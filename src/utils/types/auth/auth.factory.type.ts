import { AuthMiddleware } from "./auth.middleware.type";
import { AuthRepository } from "./auth.repository.type";
import { AuthService } from "./auth.service.type";
import { AuthValidation } from "./auth.validation.type";

export interface AuthFactory {
    getValidation(): AuthValidation;
    getService(): AuthService;
    getRepository(): AuthRepository;
    getMiddleware(): AuthMiddleware;
};
