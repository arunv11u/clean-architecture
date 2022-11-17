import { Express, NextFunction, Response } from "express";
import { Query, Params } from 'express-serve-static-core';



interface InputValidations {
    validate: (request: Express.Request, response: Express.Response, next: NextFunction) => {};
};

interface TypedRequest<P extends Params, Q extends Query, U> extends Express.Request {
    params: P;
    query: Q;
    body: U;
};


interface TypedMulterRequest<P extends Params, Q extends Query, U, F extends Express.Multer.File, FS extends Record<string, any>> extends Express.Request {
    params: P;
    query: Q;
    body: U;
    file?: F;
    files?: FS;
};


interface TypedResponse<ResBody, Locals> extends Response { };

interface BaseResponse<T> {
    data: T;
};

export {
    InputValidations,
    TypedRequest,
    TypedMulterRequest,
    TypedResponse,
    BaseResponse
};
