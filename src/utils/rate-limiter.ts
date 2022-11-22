import { Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { Config } from "./config";

const config = Config.getInstance();
const nconf = config.nconf;

export function limitRequests() {
  return rateLimit({
    windowMs: nconf.get("rateLimiterWindowMs"),
    max: nconf.get("rateLimiterMaxRequests"),
    standardHeaders: true,
    legacyHeaders: false,
    handler: (request, response, next, options) => {
      response
        .status(429)
        .send({
          errors: [{ message: "Too many requests, please try again later." }],
        });
    },
  });
}
