import { RequestHandler } from 'express';
import { appRouter } from '../../app-router';
import { MetadataKeys, RouteMethods } from '../types';


function controller(routePrefix: string) {
    return function (target: Function) {
        const router = appRouter;

        for (let key in target.prototype) {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(MetadataKeys.Path, target.prototype, key);
            const method: RouteMethods = Reflect.getMetadata(MetadataKeys.Method, target.prototype, key);
            const middlewares: RequestHandler[] = Reflect.getMetadata(MetadataKeys.Middleware, target.prototype, key) || [];

            if (path)
                router[method](`${routePrefix}${path}`, ...middlewares, routeHandler);
        };
    };
};

export {
    controller as Controller
};