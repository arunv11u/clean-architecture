
import { AuthFactory, AuthMiddleware, AuthRepository, AuthService, AuthValidation } from "../../utils";
import { AuthMiddlewareImpl } from "../middlewares/auth.middleware";
import { AuthRepositoryImpl } from "../repositories/auth.repository";
import { AuthServiceImpl } from "../services/auth.service";
import { AuthValidationImpl } from "../validations/auth.validation";


export class AuthFactoryImpl implements AuthFactory {

    private _authValidation: AuthValidation;
    private _authService: AuthService;
    private _authRepository: AuthRepository;
    private _authMiddleware: AuthMiddleware;

    constructor() {
        this._authValidation = new AuthValidationImpl();
        this._authService = new AuthServiceImpl();
        this._authRepository = new AuthRepositoryImpl();
        this._authMiddleware = new AuthMiddlewareImpl();
    };

    getValidation(): AuthValidation {
        return this._authValidation;
    };

    getService(): AuthService {
        return this._authService;
    };

    getRepository(): AuthRepository {
        return this._authRepository;
    };

    getMiddleware(): AuthMiddleware {
        return this._authMiddleware;
    };
};

