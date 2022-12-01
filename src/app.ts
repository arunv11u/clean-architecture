import 'reflect-metadata';
import { server, app } from './server';
import { devConfig, Environment, prodConfig, stagingConfig } from './utils';
import { LoaderImpl } from './utils/loader';
import "./utils/load-controller";


function startServer() {
    const loader = new LoaderImpl();
    let $PORT = prodConfig.port;

    if (process.env['NODE_ENV'] === Environment.STAGING) $PORT = stagingConfig.port;
    else if (process.env['NODE_ENV'] === Environment.DEV) $PORT = devConfig.port;

    loader.load(app, server)
        .then(() => {
            console.log(`All modules loaded successfully`);
        })
        .catch((err) => {
            console.error(`Error in loading modules : `, err);
            process.exit(1);
        });

    const port = $PORT;

    server.on("error", (error: { code: string }) => {
        if (error.code === "EADDRINUSE") {
            console.log("Address in use, exiting...");

            process.exit(1);
        };
    });

    server.listen(port, () => {
        console.log(`Listening on port: ${port}`);
    });
};

startServer();
