import { RequestHandler } from "express";
import { MetadataKeys, RouteMethods } from "../types";

interface RequestHandlerDescriptor extends PropertyDescriptor {
    value?: RequestHandler;
};

function routeBinder(method: RouteMethods) {
    return function get(path: string) {
        return function (target: any, key: string, desc: RequestHandlerDescriptor) {
            Reflect.defineMetadata(MetadataKeys.Path, path, target, key);
            Reflect.defineMetadata(MetadataKeys.Method, method, target, key);
        };
    };
};

const copy = routeBinder(RouteMethods.COPY);
const del = routeBinder(RouteMethods.DELETE);
const get = routeBinder(RouteMethods.GET);
const head = routeBinder(RouteMethods.HEAD);
const lock = routeBinder(RouteMethods.LOCK);
const options = routeBinder(RouteMethods.OPTIONS);
const patch = routeBinder(RouteMethods.PATCH);
const post = routeBinder(RouteMethods.POST);
const propFind = routeBinder(RouteMethods.PROPFIND);
const purge = routeBinder(RouteMethods.PURGE);
const put = routeBinder(RouteMethods.PUT);
const unlock = routeBinder(RouteMethods.UNLOCK);


export {
    copy as Copy,
    del as Delete,
    get as Get,
    head as Head,
    lock as Lock,
    options as Options,
    patch as Patch,
    post as Post,
    propFind as PropFind,
    purge as Purge,
    put as Put,
    unlock as Unlock
};