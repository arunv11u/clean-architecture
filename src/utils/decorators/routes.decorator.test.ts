import { Request, Response, NextFunction, RequestHandler } from 'express';
import { MetadataKeys } from '../types';
import {
    Copy, Delete, Get, Head, Lock, Options, Patch, Post, PropFind, Purge, Put, Unlock
} from './routes.decorator';


jest.mock("reflect-metadata");

describe("Decorators Module", () => {
    const routeHandler: RequestHandler = (request: Request, response: Response, next: NextFunction) => { };

    describe(`"Copy" decorator`, () => {
        describe("Happy Path", () => {
            it("Passing path as input, should define the reflect metadata for copy method", () => {
                const path = "/user";
                const key = "copy";
                const method = "copy";
                const target = {
                    prototype: {
                        [key]: routeHandler
                    }
                };
                const copy = Copy(path);

                Reflect.defineMetadata = jest.fn();

                copy(target, key, {});

                expect(Reflect.defineMetadata).toHaveBeenNthCalledWith(1, MetadataKeys.Path, path, target, key);
                expect(Reflect.defineMetadata).toHaveBeenNthCalledWith(2, MetadataKeys.Method, method, target, key);
            });
        });
    });

    describe(`"Delete" decorator`, () => {
        describe("Happy Path", () => {
            it("Passing path as input, should define the reflect metadata for delete method", () => {
                const path = "/user";
                const key = "delete";
                const method = "delete";
                const target = {
                    prototype: {
                        [key]: routeHandler
                    }
                };
                const del = Delete(path);

                Reflect.defineMetadata = jest.fn();

                del(target, key, {});

                expect(Reflect.defineMetadata).toHaveBeenNthCalledWith(1, MetadataKeys.Path, path, target, key);
                expect(Reflect.defineMetadata).toHaveBeenNthCalledWith(2, MetadataKeys.Method, method, target, key);
            });
        });
    });

    describe(`"Get" decorator`, () => {
        describe("Happy Path", () => {
            it("Passing path as input, should define the reflect metadata for get method", () => {
                const path = "/user";
                const key = "get";
                const method = "get";
                const target = {
                    prototype: {
                        [key]: routeHandler
                    }
                };
                const get = Get(path);

                Reflect.defineMetadata = jest.fn();

                get(target, key, {});

                expect(Reflect.defineMetadata).toHaveBeenNthCalledWith(1, MetadataKeys.Path, path, target, key);
                expect(Reflect.defineMetadata).toHaveBeenNthCalledWith(2, MetadataKeys.Method, method, target, key);
            });
        });
    });

    describe(`"Head" decorator`, () => {
        describe("Happy Path", () => {
            it("Passing path as input, should define the reflect metadata for head method", () => {
                const path = "/user";
                const key = "head";
                const method = "head";
                const target = {
                    prototype: {
                        [key]: routeHandler
                    }
                };
                const head = Head(path);

                Reflect.defineMetadata = jest.fn();

                head(target, key, {});

                expect(Reflect.defineMetadata).toHaveBeenNthCalledWith(1, MetadataKeys.Path, path, target, key);
                expect(Reflect.defineMetadata).toHaveBeenNthCalledWith(2, MetadataKeys.Method, method, target, key);
            });
        });
    });

    describe(`"Lock" decorator`, () => {
        describe("Happy Path", () => {
            it("Passing path as input, should define the reflect metadata for lock method", () => {
                const path = "/user";
                const key = "lock";
                const method = "lock";
                const target = {
                    prototype: {
                        [key]: routeHandler
                    }
                };
                const lock = Lock(path);

                Reflect.defineMetadata = jest.fn();

                lock(target, key, {});

                expect(Reflect.defineMetadata).toHaveBeenNthCalledWith(1, MetadataKeys.Path, path, target, key);
                expect(Reflect.defineMetadata).toHaveBeenNthCalledWith(2, MetadataKeys.Method, method, target, key);
            });
        });
    });

    describe(`"Options" decorator`, () => {
        describe("Happy Path", () => {
            it("Passing path as input, should define the reflect metadata for options method", () => {
                const path = "/user";
                const key = "options";
                const method = "options";
                const target = {
                    prototype: {
                        [key]: routeHandler
                    }
                };
                const options = Options(path);

                Reflect.defineMetadata = jest.fn();

                options(target, key, {});

                expect(Reflect.defineMetadata).toHaveBeenNthCalledWith(1, MetadataKeys.Path, path, target, key);
                expect(Reflect.defineMetadata).toHaveBeenNthCalledWith(2, MetadataKeys.Method, method, target, key);
            });
        });
    });

    describe(`"Patch" decorator`, () => {
        describe("Happy Path", () => {
            it("Passing path as input, should define the reflect metadata for patch method", () => {
                const path = "/user";
                const key = "patch";
                const method = "patch";
                const target = {
                    prototype: {
                        [key]: routeHandler
                    }
                };
                const patch = Patch(path);

                Reflect.defineMetadata = jest.fn();

                patch(target, key, {});

                expect(Reflect.defineMetadata).toHaveBeenNthCalledWith(1, MetadataKeys.Path, path, target, key);
                expect(Reflect.defineMetadata).toHaveBeenNthCalledWith(2, MetadataKeys.Method, method, target, key);
            });
        });
    });

    describe(`"Post" decorator`, () => {
        describe("Happy Path", () => {
            it("Passing path as input, should define the reflect metadata for post method", () => {
                const path = "/user";
                const key = "post";
                const method = "post";
                const target = {
                    prototype: {
                        [key]: routeHandler
                    }
                };
                const post = Post(path);

                Reflect.defineMetadata = jest.fn();

                post(target, key, {});

                expect(Reflect.defineMetadata).toHaveBeenNthCalledWith(1, MetadataKeys.Path, path, target, key);
                expect(Reflect.defineMetadata).toHaveBeenNthCalledWith(2, MetadataKeys.Method, method, target, key);
            });
        });
    });

    describe(`"PropFind" decorator`, () => {
        describe("Happy Path", () => {
            it("Passing path as input, should define the reflect metadata for propFind method", () => {
                const path = "/user";
                const key = "propFind";
                const method = "propfind";
                const target = {
                    prototype: {
                        [key]: routeHandler
                    }
                };
                const propFind = PropFind(path);

                Reflect.defineMetadata = jest.fn();

                propFind(target, key, {});

                expect(Reflect.defineMetadata).toHaveBeenNthCalledWith(1, MetadataKeys.Path, path, target, key);
                expect(Reflect.defineMetadata).toHaveBeenNthCalledWith(2, MetadataKeys.Method, method, target, key);
            });
        });
    });

    describe(`"Purge" decorator`, () => {
        describe("Happy Path", () => {
            it("Passing path as input, should define the reflect metadata for purge method", () => {
                const path = "/user";
                const key = "purge";
                const method = "purge";
                const target = {
                    prototype: {
                        [key]: routeHandler
                    }
                };
                const purge = Purge(path);

                Reflect.defineMetadata = jest.fn();

                purge(target, key, {});

                expect(Reflect.defineMetadata).toHaveBeenNthCalledWith(1, MetadataKeys.Path, path, target, key);
                expect(Reflect.defineMetadata).toHaveBeenNthCalledWith(2, MetadataKeys.Method, method, target, key);
            });
        });
    });

    describe(`"Put" decorator`, () => {
        describe("Happy Path", () => {
            it("Passing path as input, should define the reflect metadata for put method", () => {
                const path = "/user";
                const key = "put";
                const method = "put";
                const target = {
                    prototype: {
                        [key]: routeHandler
                    }
                };
                const put = Put(path);

                Reflect.defineMetadata = jest.fn();

                put(target, key, {});

                expect(Reflect.defineMetadata).toHaveBeenNthCalledWith(1, MetadataKeys.Path, path, target, key);
                expect(Reflect.defineMetadata).toHaveBeenNthCalledWith(2, MetadataKeys.Method, method, target, key);
            });
        });
    });

    describe(`"Unlock" decorator`, () => {
        describe("Happy Path", () => {
            it("Passing path as input, should define the reflect metadata for unlock method", () => {
                const path = "/user";
                const key = "unlock";
                const method = "unlock";
                const target = {
                    prototype: {
                        [key]: routeHandler
                    }
                };
                const unlock = Unlock(path);

                Reflect.defineMetadata = jest.fn();

                unlock(target, key, {});

                expect(Reflect.defineMetadata).toHaveBeenNthCalledWith(1, MetadataKeys.Path, path, target, key);
                expect(Reflect.defineMetadata).toHaveBeenNthCalledWith(2, MetadataKeys.Method, method, target, key);
            });
        });
    });
});
