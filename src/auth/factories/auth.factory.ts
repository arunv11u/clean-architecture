
import { AuthFactory, AuthRepository, AuthService, AuthValidation } from "../../utils";
import { AuthRepositoryImpl } from "../repositories/auth.repository";
import { AuthServiceImpl } from "../services/auth.service";
import { AuthValidationImpl } from "../validations/auth.validation";


export class AuthFactoryImpl implements AuthFactory {

    private _authValidation: AuthValidation;
    private _authService: AuthService;
    private _authRepository: AuthRepository;

    constructor() {
        this._authValidation = new AuthValidationImpl();
        this._authService = new AuthServiceImpl();
        this._authRepository = new AuthRepositoryImpl();
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

};

