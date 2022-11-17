import { CustomError } from './';
import { ErrorObject, GenericErrorObject } from '../types';


export class GenericError extends CustomError {
    statusCode;
    constructor(public errors: GenericErrorObject) {
        super(errors.error.message);

        this.statusCode = errors.errorCode;

        Object.setPrototypeOf(this, GenericError.prototype);
    };

    serializeErrors(): ErrorObject[] {
        const { error } = this.errors;
        return [{ message: error.message }];
    };
};
