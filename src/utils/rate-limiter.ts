import rateLimit from "express-rate-limit";
import { Config } from "./config";
import { GenericError } from "./errors";

const config = Config.getInstance();
const nconf = config.nconf;

export function limitRequests() {
  return rateLimit({
    windowMs: parseInt(nconf.get("rateLimiterWindowMs")),
    max: parseInt(nconf.get("rateLimiterMaxRequests")),
    standardHeaders: true,
    legacyHeaders: false,
    handler: (request, response, next, options) => {
      next(
        new GenericError({
          error: new Error("Too many requests, please try again later."),
          errorCode: 429,
        })
      );
    },
  });
}
