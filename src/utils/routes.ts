import express, { Request, Response, NextFunction, Express } from 'express';
import cors from 'cors';
import path from 'path';
import { corsOptions } from './cors';
import { GenericValidationError } from './errors';
import { errorHandler } from './middlewares';
import { BaseRoutes } from './types';
import { AppRouter } from '../app-router';

// Import controller files here
import '../users/controllers/user.controller';


export class Routes implements BaseRoutes {
    private static _instance: Routes;
    private _defaultRoutePath: string = "/api"
    private constructor() { };

    static getInstance(): Routes {
        if (!Routes._instance) Routes._instance = new Routes();

        return Routes._instance;
    };

    listen(app: Express): void {

        app.use(cors(corsOptions));
        app.use(express.json({ limit: '5mb' }));
        app.use(express.urlencoded({ extended: true }));

        // Below code is used to print the incoming request method and its URL.
        app.use((req: Request, res: Response, next: NextFunction) => {
            if (req.method !== 'OPTIONS')
                console.log(`${req.method} : ${req.originalUrl}`);
            next();
        });

        // Health check route.
        app.use('/healthCheck', (req: Request, res: Response, next: NextFunction) => {
            return res.status(200).send();
        });

        // Exposing images folder to the outside world.
        app.use('/images', express.static(path.join(__dirname, "./assets/images")));

        // Base URL for all following routes
        app.use(this._defaultRoutePath, AppRouter.getInstance());

        // If the requested URL doesn't match a route, then the below route will be processed.
        app.use('/**', function (req: Request, res: Response, next: NextFunction) {
            throw new GenericValidationError({
                error: new Error(`There is no route to process your request.`),
                errorCode: 404,
            });
        });

        //* The below error handler should be the last middleware.
        app.use(errorHandler);
    };

};
