import { Express } from 'express';
import http from 'http';
import { devConfig, prodConfig, stagingConfig } from './configs';
import { Environment } from './types';
import { config, DefaultConfig } from './config';
import nconf from 'nconf';
import { routes } from './routes';
import unhandledError from './unHandledErrorHandler';
import { MongooseConnect } from './mongoose-connect';

const loader = async (app: Express, server: http.Server) => {

    const mongooseConnect = new MongooseConnect();
    console.log("mongooseConnect ::", mongooseConnect);

    const _environment: Environment = process.env.NODE_ENV as Environment;
    let _config: DefaultConfig = { devConfig, prodConfig, stagingConfig };

    // To handle uncaught exceptions and unhandled promise rejections
    unhandledError();

    // configuring process variables.
    config.set(_environment, _config);

    await mongooseConnect.connect(nconf.get("dbConnectionStr"));

    routes.listen(app);

    return true;
};

export {
    loader
};