import express from "express";


class AppRouter {
    private static _instance: express.Router;

    private constructor() { };

    static getInstance(): express.Router {
        if (!AppRouter._instance) AppRouter._instance = express.Router();

        return AppRouter._instance;
    };
};

export {
    AppRouter
};
