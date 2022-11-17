import express from 'express';
import { GenericValidationError } from './errors';
import { BaseResponse, BaseUtilResponseHandler, TypedResponse } from './types';


class UtilResponseHandler implements BaseUtilResponseHandler {

    private static _instance: BaseUtilResponseHandler;

    constructor() { };

    static getInstance(): BaseUtilResponseHandler {
        if (!UtilResponseHandler._instance) UtilResponseHandler._instance = new UtilResponseHandler();

        return UtilResponseHandler._instance;
    };

    ok<ResBody, Locals>(response: TypedResponse<BaseResponse<ResBody>, Locals>, data?: ResBody): express.Response<BaseResponse<ResBody>> {
        try {
            if (!data) return response.status(200).send({ data: null });

            response.type('application/json');
            return response.status(200).send({ data });
        } catch (error) {
            throw error;
        };
    };

    created<ResBody, Locals>(response: TypedResponse<BaseResponse<ResBody>, Locals>, data?: ResBody): express.Response<BaseResponse<ResBody>> {
        if (!data) return response.status(201).send({ data: null });

        response.type('application/json');
        return response.status(201).send({ data });
    };

    clientError(message: string = "Bad Request"): GenericValidationError {
        return new GenericValidationError({ error: new Error(message), errorCode: 400 });
    };

    unauthorized(message: string = "Unauthorized"): GenericValidationError {
        return new GenericValidationError({ error: new Error(message), errorCode: 401 });
    };

    paymentRequired(message: string = "Payment required"): GenericValidationError {
        return new GenericValidationError({ error: new Error(message), errorCode: 402 });
    };

    forbidden(message: string = "Forbidden"): GenericValidationError {
        return new GenericValidationError({ error: new Error(message), errorCode: 403 });
    };

    notFound(message: string = "Not found"): GenericValidationError {
        return new GenericValidationError({ error: new Error(message), errorCode: 404 });
    };

    conflict(message: string = "Conflict"): GenericValidationError {
        return new GenericValidationError({ error: new Error(message), errorCode: 409 });
    };

    tooMany(message: string = "Too many requests"): GenericValidationError {
        return new GenericValidationError({ error: new Error(message), errorCode: 429 });
    };

    internalError(message: string = "Internal server error"): GenericValidationError {
        return new GenericValidationError({ error: new Error(message), errorCode: 500 });
    };
};

export {
    UtilResponseHandler
};
