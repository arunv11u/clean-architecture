import rateLimit from "express-rate-limit";
import nconf from 'nconf';

export class RateLimiter {

  constructor() { };


  limitRequests() {
    return rateLimit({
      windowMs: parseInt(nconf.get("rateLimiterWindowMs")),
      max: parseInt(nconf.get("rateLimiterMaxRequests")),
      standardHeaders: true,
      legacyHeaders: false,
      message: { data: "Too many requests, please try again later" },
      statusCode: 429
    });
  };
};
