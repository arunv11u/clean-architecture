import { BaseMiddlewareFactory } from "../types";

class MiddlewareFactory implements BaseMiddlewareFactory {

    private static _instance: BaseMiddlewareFactory;

    private constructor() { };

    static getInstance(): BaseMiddlewareFactory {
        if (!MiddlewareFactory._instance) MiddlewareFactory._instance = new MiddlewareFactory();

        return MiddlewareFactory._instance;
    };


};

export {
    MiddlewareFactory
};
