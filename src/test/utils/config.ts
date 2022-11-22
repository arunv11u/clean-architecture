import { Express, Request, Response, NextFunction } from "express";
import http from "http";
import https from "https";
import { Config, DefaultConfig, Environment } from "../../utils";

const testConfig = {
  memory: true,
  ip: "localhost",
  dataBase: "lifeverse",
};

const loader = async (app: Express, server: http.Server | https.Server) => {
  const _environment: Environment = process.env.NODE_ENV as Environment;
  let _config: DefaultConfig = { testConfig: {}, prodConfig: {} };

  // configuring process variables.
  const config = Config.getInstance();
  config.set(_environment, _config);

  // Registering routes
  // Health check route.
};

export { testConfig, loader };
