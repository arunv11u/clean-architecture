import nconf from 'nconf';
import { Environment } from './types';
import { GenericError } from './errors';

export type NCONF = typeof nconf;

export interface DefaultConfig {
    prodConfig: Record<string, any>;
    stagingConfig?: Record<string, any>;
    devConfig?: Record<string, any>;
    testConfig?: Record<string, any>;
};


export abstract class BaseConfig {
    constructor() { };

    abstract get nconf(): NCONF;
    abstract set(environment: Environment, config: DefaultConfig): void;
};

export class Config extends BaseConfig {

    private static _instance: BaseConfig;
    private _nconf: NCONF = nconf;
    private isRequired: boolean = false;

    private constructor() {
        super();
    };

    get nconf() {
        if (!this.isRequired) throw new GenericError({ error: new Error(`Cannot get nconf without setting it up`), errorCode: 500 });
        return this._nconf;
    };

    static getInstance(): BaseConfig {
        if (!Config._instance) Config._instance = new Config();

        return Config._instance;
    };

    set(environment: Environment, config: DefaultConfig) {
        try {
            this.isRequired = true;
            let data = {};
            if (environment === Environment.PRODUCTION)
                data = {
                    ...config.prodConfig
                };
            else if (environment === Environment.STAGING)
                data = {
                    ...config.stagingConfig
                };
            else if (environment === Environment.DEV)
                data = {
                    ...config.devConfig
                };
            else if (environment === Environment.TEST)
                data = {
                    ...config.testConfig
                };
            else
                data = {
                    ...config.devConfig,
                };

            this._nconf.argv().env().add('data', { type: 'literal', store: data });
        } catch (error) {
            throw error;
        };
    };
};
