import { MetadataKeys } from "../types";
import { RequestHandler } from 'express';

function use(middleware: RequestHandler) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
        const middlewares = Reflect.getMetadata(MetadataKeys.Middleware, target, key) || [];

        Reflect.defineMetadata(MetadataKeys.Middleware, [middleware, ...middlewares], target, key);
    };
};

export {
    use as Use
};