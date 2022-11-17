import { UserValidation } from "../../users";
import { BaseUserValidation, BaseValidationFactory } from "../types";


class ValidationFactory implements BaseValidationFactory {

    private static _instance: BaseValidationFactory;

    private constructor() { };

    static getInstance(): BaseValidationFactory {
        if (!ValidationFactory._instance) ValidationFactory._instance = new ValidationFactory();

        return ValidationFactory._instance;
    };

    getUserValidation(): BaseUserValidation {
        return UserValidation.getInstance();
    };
};

export {
    ValidationFactory
};
