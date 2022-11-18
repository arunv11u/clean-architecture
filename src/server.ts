import express from 'express';
import http from 'node:http';
import https from 'node:https';

const app = express();
let server: http.Server | https.Server;

server = http.createServer(app);

export { server, app };
