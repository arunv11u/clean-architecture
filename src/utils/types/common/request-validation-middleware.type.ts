import { ObjectSchema, ValidationError } from 'joi';
import { RequestHandler } from 'express';

interface BaseRequestValidationMiddleware {
    requestValidate(params: Partial<Record<Segments, ObjectSchema>>): RequestHandler;
};

enum Segments {
    BODY = 'body',
    COOKIES = 'cookies',
    HEADERS = 'headers',
    PARAMS = 'params',
    QUERY = 'query',
    SIGNEDCOOKIES = 'signedCookies', //! cross check signed cookies spelling
    FILE = "file",
    FILES = "files"
};


interface BaseValidateRequestError {
    details: Map<Segments, ValidationError>
};

export {
    BaseRequestValidationMiddleware,
    Segments,
    BaseValidateRequestError
};