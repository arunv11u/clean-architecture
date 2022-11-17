import express from 'express';
import http from 'node:http';
import https from 'node:https';
import fs from 'fs';
import { Environment } from './utils';

const app = express();
let server: http.Server | https.Server;

const environment = process.env.NODE_ENV;

if (environment === Environment.PRODUCTION || environment === Environment.STAGING) {
    const options = {
        key: fs.readFileSync('/opt/key.pem', 'utf8'),
        cert: fs.readFileSync('/opt/cert.pem', 'utf8')
    };

    server = https.createServer(options, app);
} else server = http.createServer(app);

export { server, app };
