import 'reflect-metadata';
import { server, app } from './server';
import { devConfig, Environment, loader, prodConfig, stagingConfig } from './utils';


let $PORT = prodConfig.port;


if (process.env['NODE_ENV'] === Environment.STAGING) $PORT = stagingConfig.port;
else if (process.env['NODE_ENV'] === Environment.DEV) $PORT = devConfig.port;

loader(app, server)
    .then(() => {
        console.log(`All modules loaded successfully`);
    })
    .catch((err) => {
        console.error(`Error in loading modules : `, err);
        process.exit();
    });

const port = $PORT;
server.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
