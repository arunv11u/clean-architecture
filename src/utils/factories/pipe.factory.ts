import { UserPipeImpl } from "../../users";
import { PipeFactory, UserPipe } from "../types";


export class PipeFactoryImpl implements PipeFactory {

    constructor() { };

    getUserPipe(): UserPipe {
        return new UserPipeImpl();
    };
};
