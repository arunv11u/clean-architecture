import { RequestHandler, Request, Response, NextFunction } from 'express';
import { appRouter } from '../../app-router';
import { MetadataKeys } from '../types';
import { Controller } from './controller.decorator';


jest.mock("reflect-metadata");


describe("Decorators Module", () => {
    describe(`"controller" decorator`, () => {
        describe("Happy Path", () => {
            it("If a class has controller decorator and contains methods, should register the route in the express router", () => {
                const routePrefix = "/user";
                const method = "put";
                const path = "/update";
                const key = "update";
                const controller = Controller(routePrefix);
                const routeHandler: RequestHandler = (request: Request, response: Response, next: NextFunction) => { };
                const target = {
                    prototype: {
                        [key]: routeHandler
                    }
                };
                const middlewares: RequestHandler[] = [(request: Request, response: Response, next: NextFunction) => { }];
                const spyRouter = jest.spyOn(appRouter, method);

                Reflect.getMetadata = jest.fn()
                    .mockImplementationOnce(() => path)
                    .mockImplementationOnce(() => method)
                    .mockImplementationOnce(() => middlewares);


                controller(target as any);

                expect(Reflect.getMetadata).toHaveBeenNthCalledWith(1, MetadataKeys.Path, target.prototype, key);
                expect(Reflect.getMetadata).toHaveBeenNthCalledWith(2, MetadataKeys.Method, target.prototype, key);
                expect(Reflect.getMetadata).toHaveBeenNthCalledWith(3, MetadataKeys.Middleware, target.prototype, key);
                expect(spyRouter).toHaveBeenCalledWith(`${routePrefix}${path}`, ...middlewares, routeHandler);
            });
        });
    });
});
