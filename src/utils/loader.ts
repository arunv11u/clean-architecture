import { Express } from 'express';
import http from 'http';
import { devConfig, prodConfig, stagingConfig } from './configs';
import { Environment } from './types';
import { Config, DefaultConfig } from './config';
import { RoutesImpl } from './routes';
import unhandledError from './unHandledErrorHandler';


const loader = async (app: Express, server: http.Server) => {

    const _environment: Environment = process.env.NODE_ENV as Environment;
    let _config: DefaultConfig = { devConfig, prodConfig, stagingConfig };

    // To handle uncaught exceptions and unhandled promise rejections
    unhandledError();

    // configuring process variables.
    const config = Config.getInstance();
    config.set(_environment, _config);

    // Registering routes
    const routes = new RoutesImpl();
    routes.listen(app);

    return true;
};

export {
    loader
};