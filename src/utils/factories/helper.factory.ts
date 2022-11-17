import { BaseHelperFactory } from "../types";


class HelperFactory implements BaseHelperFactory {

    private static _instance: BaseHelperFactory;

    private constructor() { };

    static getInstance(): BaseHelperFactory {
        if (!HelperFactory._instance) HelperFactory._instance = new HelperFactory();

        return HelperFactory._instance;
    };

};

export {
    HelperFactory
};
