import { faker } from '@faker-js/faker';
import { Request, Response, NextFunction } from 'express';
import { RateLimiter } from './rate-limiter';

describe("Rate Limiter Module", () => {
  const rateLimiter = new RateLimiter();
  let mockRequest: Partial<Request> = {};
  let mockResponse: Partial<Response> = {};
  const mockNextFn: jest.Mock = jest.fn();
  const mockStatus: jest.Mock = jest.fn();
  const mockSend: jest.Mock = jest.fn();

  beforeEach(() => {
    mockRequest = {
      ip: faker.internet.ip()
    };
    mockResponse = {
      setHeader: jest.fn(),
      status: mockStatus,
      send: mockSend
    };
  });

  describe(`"limitRequests" method`, () => {

    describe("Exception Path", () => {
      const requestLimit = 2;
      process.env.rateLimiterMaxRequests = requestLimit.toString();
      const limitRequests = rateLimiter.limitRequests();

      it(`If more requests come from the same IP, next function should call with error`, async () => {
        limitRequests(mockRequest as Request, mockResponse as Response, mockNextFn as NextFunction);
        limitRequests(mockRequest as Request, mockResponse as Response, mockNextFn as NextFunction);
        limitRequests(mockRequest as Request, mockResponse as Response, mockNextFn as NextFunction);

        await new Promise((resolve, reject) => setTimeout(resolve, 300));

        expect(mockNextFn).toHaveBeenCalled();
      });
    });

    describe("Happy Path", () => {
      it("If request, response, next fn provided, should call the next function without arguments", async () => {
        const limitRequests = rateLimiter.limitRequests();
        limitRequests(mockRequest as Request, mockResponse as Response, mockNextFn as NextFunction);

        await new Promise((resolve, reject) => setTimeout(resolve, 300));

        expect(mockNextFn).toHaveBeenCalled();
      });
    });
  });
});

