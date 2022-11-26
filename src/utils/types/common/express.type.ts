import { Express, Response } from "express";
import { Query, Params } from 'express-serve-static-core';


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

interface CustomResponse<T> {
    data: T;
};

export {
    TypedRequest,
    TypedMulterRequest,
    TypedResponse,
    CustomResponse
};
