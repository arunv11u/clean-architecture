import express from "express";


class AppRouter {
    private static _instance: express.Router;
    private static _router: any = express.Router;

    private constructor() { };

    static get router():any {
        return this._router;
    };

    static getInstance(): express.Router {
        if (!AppRouter._instance) AppRouter._instance = this._router();

        return AppRouter._instance;
    };
};

export {
    AppRouter
};
