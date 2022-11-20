import http from 'node:http';
import express from 'express';
import { server, app } from '../server';

describe(`"Server" Module`, () => {
    describe("Create Server fn", () => {
        describe("Happy Path", () => {
            it("Needed Http Server, server should be Http Server", () => {
                expect(server).toStrictEqual(http.createServer(app));
            });

            it("Needed Express Application, app should be express app", () => {
                const _app = express();
                expect(app.name).toBe(_app.name);
            });
        });
    });
});


