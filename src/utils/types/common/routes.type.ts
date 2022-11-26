import { Express } from 'express';

enum RouteMethods {
    GET = "get",
    POST = "post",
    PUT = "put",
    PATCH = "patch",
    DELETE = "delete",
    COPY = "copy",
    HEAD = "head",
    OPTIONS = "options",
    PURGE = "purge",
    LOCK = "lock",
    UNLOCK = "unlock",
    PROPFIND = "propfind"
};

interface Routes {
    listen(app: Express): boolean;
};

export {
    RouteMethods,
    Routes
};
