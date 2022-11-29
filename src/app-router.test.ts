import express from "express";
import { appRouter } from "./app-router";


describe("App Router Class", () => {
    describe(`"getInstance" method`, () => {

        describe("Happy Path", () => {
            it("No input has passed, should return router object", () => {
                expect(appRouter.name).toBe(express.Router().name);
            });
        });

    });
});
