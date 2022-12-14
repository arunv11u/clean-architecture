import { Express } from 'express';
import http from 'http';
import { devConfig, prodConfig, stagingConfig } from './configs';
import { Environment, Loader } from './types';
import { config, DefaultConfig } from './config';
import nconf from 'nconf';
import { routes } from './routes';
import unhandledError from './unhandled-error-handler';
import { DbConnect } from './types';
import { MongooseConnect } from './mongoose-connect';

export class LoaderImpl implements Loader {

    private _mongooseConnect: DbConnect;

    constructor() {
        this._mongooseConnect = new MongooseConnect();
    };

    async load(app: Express, server: http.Server) {

        const _environment: Environment = process.env.NODE_ENV as Environment;
        let _config: DefaultConfig = { devConfig, prodConfig, stagingConfig };

        // To handle uncaught exceptions and unhandled promise rejections
        unhandledError();

        // configuring process variables.
        config.set(_environment, _config);

        await this._mongooseConnect.connect(nconf.get("dbConnectionStr"));

        routes.listen(app);

        return true;
    };
};
