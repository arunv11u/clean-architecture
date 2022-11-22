import request from "superagent";
import http from "http";
import { Request, Response, NextFunction } from "express";
import { app } from "../server";
import { limitRequests } from "./rate-limiter";

app.use(limitRequests());

app.use("/health-check", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).send();
});

describe("Rate Limiter Module", () => {
  describe(`"limitRequests" method`, () => {
    describe("Happy Path", () => {
      it.skip("If more than 50 requests comes from the same IP, should send 429 error response to the client", async () => {
        const startServerPromise = new Promise((resolve, reject) => {
          http.createServer(app).listen(8001, () => {
            resolve(true);
          });
        });
        await startServerPromise;

        const requestLimit = 51;
        for (let index = 1; index <= requestLimit; index++) {
          try {
            await request.get("http://localhost:8001/health-check");
          } catch (error: any) {
            expect(error.response.statusCode).toBe(429);
            expect(error.response.body).toStrictEqual({
              errors: [
                { message: "Too many requests, please try again later." },
              ],
            });
          }
        }
      });
    });
  });
});
