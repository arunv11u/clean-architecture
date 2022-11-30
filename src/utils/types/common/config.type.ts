import { DefaultConfig } from "../../config";
import { Environment } from "./environment.type";

export interface Config {
    set(environment: Environment, config: DefaultConfig): void;
};
