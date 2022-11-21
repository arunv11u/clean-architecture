import express from "express";
import { AppRouter } from "./app-router";


describe("App Router Class", () => {
    describe(`"getInstance" method`, () => {

        describe("Happy Path", () => {
            it("No input has passed, should return router object", () => {
                const appRouter = AppRouter.getInstance();

                expect(AppRouter.router).toBe(express.Router);
                expect(AppRouter.getInstance()).toBe(appRouter);
            });
        });

    });
});
