import { Express } from 'express';
import http from 'http';
import { devConfig, prodConfig, stagingConfig } from './configs';
import { Environment } from './types';
import { config, DefaultConfig } from './config';
import { routes } from './routes';
import unhandledError from './unHandledErrorHandler';

const loader = async (app: Express, server: http.Server) => {

    const _environment: Environment = process.env.NODE_ENV as Environment;
    let _config: DefaultConfig = { devConfig, prodConfig, stagingConfig };

    // To handle uncaught exceptions and unhandled promise rejections
    unhandledError();

    // configuring process variables.
    config.set(_environment, _config);

    // Registering routes
    routes.listen(app);

    return true;
};

export {
    loader
};