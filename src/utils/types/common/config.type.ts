import { DefaultConfig, NCONF } from "../../config";
import { Environment } from "./environment.type";

export abstract class Config {
    constructor() { };

    abstract get nconf(): NCONF;
    abstract set(environment: Environment, config: DefaultConfig): void;
};
