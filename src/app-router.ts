import express from "express";

class AppRouterSingleton {
    private static _instance: express.Router;
    private static _router: any = express.Router();

    private constructor() { };

    static getInstance(): express.Router {
        if (!AppRouterSingleton._instance) AppRouterSingleton._instance = this._router;

        return AppRouterSingleton._instance;
    };
};

export const appRouter = AppRouterSingleton.getInstance();
