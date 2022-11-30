import { Express } from "express";
import http from "http";
import https from "https";
import { config, DefaultConfig, Environment } from "../../utils";

const testConfig = {
  mongodb: {
    memory: true,
    ip: "localhost",
    port: 27017,
    dataBase: "lifeverse-test"
  }
};

const loader = async (app: Express, server: http.Server | https.Server) => {
  const _environment: Environment = process.env.NODE_ENV as Environment;
  let _config: DefaultConfig = { testConfig: {}, prodConfig: {} };

  // configuring process variables.
  process.env.rateLimiterWindowMs = (5 * 60 * 1000).toString();
  process.env.rateLimiterMaxRequests = (50).toString();

  config.set(_environment, _config);

  // Registering routes

};

export { testConfig, loader };
