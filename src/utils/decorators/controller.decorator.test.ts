import { RequestHandler, Request, Response, NextFunction } from 'express';
import { appRouter } from '../../app-router';
import { Controller } from './controller.decorator';


jest.mock("reflect-metadata");


describe("Decorators Module", () => {
    describe(`"controller" decorator`, () => {
        describe("Happy Path", () => {
            it("If a class has controller decorator and contains methods, should register the route in the express router", () => {
                const routePrefix = "/user";
                const method = "put";
                const path = "/update";
                const controller = Controller(routePrefix);
                const routeHandler: RequestHandler = (request: Request, response: Response, next: NextFunction) => { };
                const target = {
                    prototype: {
                        "update": routeHandler
                    }
                };
                const middlewares: RequestHandler[] = [(request: Request, response: Response, next: NextFunction) => { }];
                const spyRouter = jest.spyOn(appRouter, method);

                Reflect.getMetadata = jest.fn()
                    .mockImplementationOnce(() => path)
                    .mockImplementationOnce(() => method)
                    .mockImplementationOnce(() => middlewares);


                controller(target as any);

                expect(spyRouter).toHaveBeenCalledWith(`${routePrefix}${path}`, ...middlewares, routeHandler);
            });
        });
    });
});
