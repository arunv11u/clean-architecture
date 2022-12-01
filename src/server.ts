import express from 'express';
import http from 'node:http';
import https from 'node:https';

const app = express();
let server: http.Server | https.Server;

server = http.createServer(app);

export const errorEventHandler = (error: { code: string }) => {
    if (error.code === "EADDRINUSE") {
        console.log("Address in use, exiting...");

        process.exit(1);
    };
};

server.on("error", errorEventHandler);

export { server, app };