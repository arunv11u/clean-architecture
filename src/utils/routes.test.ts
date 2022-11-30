import request from "supertest";
import { routes } from "./routes";
import { app } from "../server";


describe("Route Module", () => {

  describe(`"listen" fn`, () => {
    describe("Happy Path", () => {
      it("Express application passed as an argument, should register routes", () => {
        routes.listen(app);
      });
    });
  });

  describe(`"Health Check" Endpoint`, () => {
    describe("Happy Path", () => {
      it("Make health check request, should return status code 200", async () => {
        const response = await request(app).get("/health-check");
        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe(`"No route" handler`, () => {
    describe("Happy Path", () => {
      it("Request to an unavailable API, should return no route error", async () => {
        const response = await request(app).get("/api/sample");
        expect(response.statusCode).toBe(404);
        expect(response.body).toStrictEqual({ errors: [{ message: "There is no route to process your request." }] });
      });
    });
  });
});
