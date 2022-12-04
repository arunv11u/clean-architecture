import 'reflect-metadata';
import { server, app } from './server';
import { devConfig, Environment, Loader, prodConfig, stagingConfig } from './utils';
import { LoaderImpl } from './utils/loader';
import "./utils/load-controller";


export class App {
    private _loader: Loader;
    private _port: number;

    constructor() {
        this._loader = new LoaderImpl();
        this._port = prodConfig.port;
    };

    async main() {
        try {
            if (process.env['NODE_ENV'] === Environment.STAGING) this._port = stagingConfig.port;
            else if (process.env['NODE_ENV'] === Environment.DEV) this._port = devConfig.port;

            await this._loader.load(app, server);
            console.log(`All modules loaded successfully`);

            server.listen(this._port, () => console.log(`Listening on port: ${this._port}`));

        } catch (error) {
            console.log("Error in loading modules", error);

            process.exit(1)
        };
    };
};

new App().main();
