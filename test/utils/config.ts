import { Express } from "express";
import http from "http";
import https from "https";

const testConfig = {
    memory: true,
    ip: 'localhost',
    dataBase: 'lifeverse'
};

const loader = async (app: Express, server: http.Server | https.Server) => {

};

export {
    testConfig,
    loader
};