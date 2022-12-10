import express, { Request, Response, NextFunction, Express } from "express";
import cors from "cors";
import path from "path";
import { corsOptions } from "./cors";
import { GenericError } from "./errors";
import { errorHandler, setSecurityHeader } from "./middlewares";
import { Routes } from "./types";
import { appRouter } from "../app-router";
import { RateLimiter } from './rate-limiter';

class RoutesImpl implements Routes {
  private _defaultRoutePath: string = "/api";
  private _rateLimiter: RateLimiter;
  
  constructor() { 
    this._rateLimiter = new RateLimiter();
  };

  listen(app: Express): boolean {
    app.disable("x-powered-by");
    app.enable("trust proxy");
    app.use(setSecurityHeader);
    app.use(cors(corsOptions));
    app.use(express.json({ limit: "5mb" }));
    app.use(express.urlencoded({ extended: true }));

    // Below code is used to print the incoming request method and its URL.
    app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.method !== "OPTIONS")
        console.log(`${req.method} : ${req.originalUrl}`);
      next();
    });

    // Rate limiter
    app.use(this._rateLimiter.limitRequests());

    // Health check route.
    app.use(
      "/health-check",
      (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).send();
      }
    );

    // Exposing images folder to the outside world.
    app.use("/images", express.static(path.join(__dirname, "./assets/images")));

    // Base URL for all following routes
    app.use(this._defaultRoutePath, appRouter);


    // If the requested URL doesn't match a route, then the below route will be processed.
    app.use("/**", function (req: Request, res: Response, next: NextFunction) {
      throw new GenericError({
        error: new Error(`There is no route to process your request.`),
        errorCode: 404
      });
    });

    //* The below error handler should be the last middleware.
    app.use(errorHandler);

    return true;
  };
};

export const routes = new RoutesImpl();
