import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors";
import { FormattedError } from "../types";

export const errorHandler = (err: Error,
    request: Request,
    response: Response,
    next: NextFunction) => {

    const formattedErrorResponse: FormattedError = {
        errors: [
            {
                message: 'Something went wrong, please try again',
            },
        ],
    };
    const _error = {
        _code: 500,
    };
    if (err instanceof CustomError)
        return response.status(err.statusCode).send({ errors: err.serializeErrors() });

    return response.status(_error._code).send(formattedErrorResponse);
};