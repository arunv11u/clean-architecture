
import { AuthFactory, AuthRepository, AuthService, AuthValidation } from "../../utils";
import { AuthRepositoryImpl } from "../repositories/auth.repository";
import { AuthServiceImpl } from "../services/auth.service";
import { AuthValidationImpl } from "../validations/auth.validation";



export class AuthFactoryImpl implements AuthFactory {

    constructor() { };

    getValidation(): AuthValidation {
        return new AuthValidationImpl();
    };

    getService(): AuthService {
        return new AuthServiceImpl();
    };

    getRepository(): AuthRepository {
        return new AuthRepositoryImpl();
    };

};
