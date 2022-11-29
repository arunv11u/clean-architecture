import rateLimit from "express-rate-limit";
import nconf from 'nconf';
import { GenericError } from "./errors";

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
    }
  });
}
