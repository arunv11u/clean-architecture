import { NextFunction, Request, Response, RequestHandler } from 'express';
import { MetadataKeys } from '../types';
import { Use } from './use.decorator';

jest.mock("reflect-metadata");

describe("Decorators Module", () => {
    describe(`"Use" decorator`, () => {
        it(`If middleware is passed as input, should define the "middleware" reflect metadata for the respective method`, () => {
            const routeHandler: RequestHandler = (request: Request, response: Response, next: NextFunction) => { };
            const existingMiddlewares: RequestHandler[] = [
                (request: Request, response: Response, next: NextFunction) => { },
                (request: Request, response: Response, next: NextFunction) => { }
            ];
            const middleware: RequestHandler = (request: Request, response: Response, next: NextFunction) => { };
            const key = "copy";
            const target = {
                prototype: {
                    [key]: routeHandler
                }
            };
            const use = Use(middleware);

            Reflect.getMetadata = jest.fn().mockImplementationOnce(() => existingMiddlewares);
            Reflect.defineMetadata = jest.fn();

            use(target, key, {});

            expect(Reflect.getMetadata).toHaveBeenCalledWith(MetadataKeys.Middleware, target, key);
            expect(Reflect.defineMetadata).toHaveBeenCalledWith(MetadataKeys.Middleware, [middleware, ...existingMiddlewares], target, key);
        });
    });
});
