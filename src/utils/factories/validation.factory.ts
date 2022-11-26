import { UserValidationImpl } from "../../users";
import { UserValidation, ValidationFactory } from "../types";


export class ValidationFactoryImpl implements ValidationFactory {

    constructor() { };

    getUserValidation(): UserValidation {
        return new UserValidationImpl();
    };
};
