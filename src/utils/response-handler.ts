import express from 'express';
import { GenericError } from './errors';
import { BaseResponse, BaseUtilResponseHandler, TypedResponse } from './types';


class ResponseHandler implements BaseUtilResponseHandler {

    private static _instance: BaseUtilResponseHandler;

    constructor() { };

    static getInstance(): BaseUtilResponseHandler {
        if (!ResponseHandler._instance) ResponseHandler._instance = new ResponseHandler();

        return ResponseHandler._instance;
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

    clientError(message: string = "Bad Request"): GenericError {
        return new GenericError({ error: new Error(message), errorCode: 400 });
    };

    unauthorized(message: string = "Unauthorized"): GenericError {
        return new GenericError({ error: new Error(message), errorCode: 401 });
    };

    paymentRequired(message: string = "Payment required"): GenericError {
        return new GenericError({ error: new Error(message), errorCode: 402 });
    };

    forbidden(message: string = "Forbidden"): GenericError {
        return new GenericError({ error: new Error(message), errorCode: 403 });
    };

    notFound(message: string = "Not found"): GenericError {
        return new GenericError({ error: new Error(message), errorCode: 404 });
    };

    conflict(message: string = "Conflict"): GenericError {
        return new GenericError({ error: new Error(message), errorCode: 409 });
    };

    tooMany(message: string = "Too many requests"): GenericError {
        return new GenericError({ error: new Error(message), errorCode: 429 });
    };

    internalError(message: string = "Internal server error"): GenericError {
        return new GenericError({ error: new Error(message), errorCode: 500 });
    };
};

export {
    ResponseHandler
};
