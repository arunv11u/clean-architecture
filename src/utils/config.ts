import nconf from 'nconf';
import { Config, Environment } from './types';

export interface DefaultConfig {
    prodConfig: Record<string, any>;
    stagingConfig?: Record<string, any>;
    devConfig?: Record<string, any>;
    testConfig?: Record<string, any>;
};

class ConfigSingleton implements Config {

    set(environment: Environment, config: DefaultConfig) {
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

        nconf.argv().env().add('data', { type: 'literal', store: data });
    };
};

export const config = new ConfigSingleton();
