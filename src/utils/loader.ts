import { Express } from 'express';
import http from 'http';
import { devConfig, prodConfig, stagingConfig } from './configs';
import { Environment } from './types';
import { Config, DefaultConfig } from './config';
import { Routes } from './routes';


const loader = async (app: Express, server: http.Server) => {

    const _environment: Environment = process.env.NODE_ENV as Environment;
    let _config: DefaultConfig = { devConfig, prodConfig, stagingConfig };

    // To handle uncaught exceptions and unhandled promise rejections
    process.on('unhandledRejection', (reason, p) => {
        console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
    });
    process.on('uncaughtException', function (exception) {
        console.error(exception); // To see your exception details in the console
    });

    // configuring process variables.
    const config = Config.getInstance();
    config.set(_environment, _config);

    // Registering routes
    const routes = Routes.getInstance();
    routes.listen(app);

    return true;
};

export {
    loader
};