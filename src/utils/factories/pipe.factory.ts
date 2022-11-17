import { UserPipe } from "../../users";
import { BaseUserPipe, BasePipeFactory } from "../types";


class PipeFactory implements BasePipeFactory {

    private static _instance: BasePipeFactory;

    private constructor() { };

    static getInstance(): BasePipeFactory {
        if (!PipeFactory._instance) PipeFactory._instance = new PipeFactory();

        return PipeFactory._instance;
    };

    getUserPipe(): BaseUserPipe {
        return UserPipe.getInstance();
    };
};

export {
    PipeFactory
};
