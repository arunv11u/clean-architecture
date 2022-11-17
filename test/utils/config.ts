import { Express } from "express";
import http from "http";
import https from "https";
import { devConfig, prodConfig, stagingConfig } from "../../src/utils/";

const testConfig = {
    port: 3000
};

const config = {
    memory: true,
    ip: 'localhost',
    port: 3000,
    dataBase: 'kingdom-nation',
    realm: "knrealm",
    authUrl: "https://servbox03.external.infra.ruahtech.com",
    clientId: "KN-test-api",
    clientSecret: "bb579feb-a912-4986-8f7c-daecaf97a2e5",
    keycloakUsername: "admin",
    keycloakPassword: "dErdAFf02Dfr421Gr"
};

const loader = async (app: Express, server: http.Server | https.Server) => {
    
};

export {
    testConfig,
    config,
    loader
};