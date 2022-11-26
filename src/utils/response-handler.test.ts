import { Response } from "express";
import { GenericError } from "./errors";
import { ResponseHandlerImpl } from "./response-handler";

describe("Response Handler Module", () => {
  const responseHandler = new ResponseHandlerImpl();

  describe(`"ok" method`, () => {
    let mockResponse: Partial<Response>;
    let mockSendMethod: jest.Mock;

    beforeEach(() => {
      mockSendMethod = jest.fn();
      mockResponse = {
        status: jest.fn(() => ({ send: mockSendMethod } as any)),
        type: jest.fn(),
      };
    });

    describe("Exception Path", () => {
      it("If response object is undefined, should throw an error", () => {

        expect(() => responseHandler.ok(undefined as any)).toThrow(
          GenericError
        );
        expect(() => responseHandler.ok(undefined as any)).toThrow(
          "Response object is undefined, expected express response object"
        );
      });
    });

    describe("Happy Path", () => {
      it("Response object and null response data has passed as arguments, should send success response and null data to the client", () => {
        const _code = 200;
        responseHandler.ok(mockResponse as Response);

        expect(mockResponse.status).toBeCalledWith(_code);
        expect(mockResponse.type).toBeCalledWith("application/json");
        expect(mockSendMethod).toBeCalledWith({ data: null });
      });

      it("Response object and some response data has passed as arguments, should send success response and also the data to the client", () => {
        const _code = 200;
        const _data = "Sample data";
        responseHandler.ok<string, any>(mockResponse as Response, _data);

        expect(mockResponse.status).toBeCalledWith(_code);
        expect(mockResponse.type).toBeCalledWith("application/json");
        expect(mockSendMethod).toBeCalledWith({ data: _data });
      });
    });
  });

  describe(`"created" method`, () => {
    let mockResponse: Partial<Response>;
    let mockSendMethod: jest.Mock;

    beforeEach(() => {
      mockSendMethod = jest.fn();
      mockResponse = {
        status: jest.fn(() => ({ send: mockSendMethod } as any)),
        type: jest.fn(),
      };
    });

    describe("Exception Path", () => {
      it("If response object is undefined, should throw an error", () => {

        expect(() => responseHandler.created(undefined as any)).toThrow(
          GenericError
        );
        expect(() => responseHandler.created(undefined as any)).toThrow(
          "Response object is undefined, expected express response object"
        );
      });
    });

    describe("Happy Path", () => {
      it("Response object and null response data has passed as arguments, should send success response and null data to the client", () => {
        const _code = 201;
        responseHandler.created(mockResponse as Response);

        expect(mockResponse.status).toBeCalledWith(_code);
        expect(mockResponse.type).toBeCalledWith("application/json");
        expect(mockSendMethod).toBeCalledWith({ data: null });
      });

      it("Response object and some response data has passed as arguments, should send success response and also the data to the client", () => {
        const _code = 201;
        const _data = "Sample data";
        responseHandler.created<string, any>(mockResponse as Response, _data);

        expect(mockResponse.status).toBeCalledWith(_code);
        expect(mockResponse.type).toBeCalledWith("application/json");
        expect(mockSendMethod).toBeCalledWith({ data: _data });
      });
    });
  });

  describe(`"clientError" method`, () => {
    describe("Happy Path", () => {
      it("Message is passed as undefined, should send default bad request error to the client", () => {
        const _code = 400;
        const error = responseHandler.clientError(undefined as any);

        expect(error).toBeInstanceOf(GenericError);
        expect(error.statusCode).toBe(_code);
        expect(error.message).toBe("Bad Request");
      });

      it("Some string is provided through message argument, should send the provided error message to the client", () => {
        const _code = 400;
        const _errorMessage = "Name is required";
        const error = responseHandler.clientError(_errorMessage);

        expect(error).toBeInstanceOf(GenericError);
        expect(error.statusCode).toBe(_code);
        expect(error.message).toBe(_errorMessage);
      });
    });
  });

  describe(`"unauthorized" method`, () => {
    describe("Happy Path", () => {
      it("Message is passed as undefined, should send default unauthorized error to the client", () => {
        const _code = 401;
        const error = responseHandler.unauthorized(undefined as any);

        expect(error).toBeInstanceOf(GenericError);
        expect(error.statusCode).toBe(_code);
        expect(error.message).toBe("Unauthorized");
      });

      it("Some string is provided through message argument, should send the provided error message to the client", () => {
        const _code = 401;
        const _errorMessage = "Token is invalid";
        const error = responseHandler.unauthorized(_errorMessage);

        expect(error).toBeInstanceOf(GenericError);
        expect(error.statusCode).toBe(_code);
        expect(error.message).toBe(_errorMessage);
      });
    });
  });

  describe(`"paymentRequired" method`, () => {
    describe("Happy Path", () => {
      it("Message is passed as undefined, should send default payment required error to the client", () => {
        const _code = 402;
        const error = responseHandler.paymentRequired(undefined as any);

        expect(error).toBeInstanceOf(GenericError);
        expect(error.statusCode).toBe(_code);
        expect(error.message).toBe("Payment required");
      });

      it("Some string is provided through message argument, should send the provided error message to the client", () => {
        const _code = 402;
        const _errorMessage = "Payment not done";
        const error = responseHandler.paymentRequired(_errorMessage);

        expect(error).toBeInstanceOf(GenericError);
        expect(error.statusCode).toBe(_code);
        expect(error.message).toBe(_errorMessage);
      });
    });
  });

  describe(`"forbidden" method`, () => {
    describe("Happy Path", () => {
      it("Message is passed as undefined, should send default forbidden error to the client", () => {
        const _code = 403;
        const error = responseHandler.forbidden(undefined as any);

        expect(error).toBeInstanceOf(GenericError);
        expect(error.statusCode).toBe(_code);
        expect(error.message).toBe("Forbidden");
      });

      it("Some string is provided through message argument, should send the provided error message to the client", () => {
        const _code = 403;
        const _errorMessage = "You don't have enough access";
        const error = responseHandler.forbidden(_errorMessage);

        expect(error).toBeInstanceOf(GenericError);
        expect(error.statusCode).toBe(_code);
        expect(error.message).toBe(_errorMessage);
      });
    });
  });

  describe(`"notFound" method`, () => {
    describe("Happy Path", () => {
      it("Message is passed as undefined, should send default not found error to the client", () => {
        const _code = 404;
        const error = responseHandler.notFound(undefined as any);

        expect(error).toBeInstanceOf(GenericError);
        expect(error.statusCode).toBe(_code);
        expect(error.message).toBe("Not found");
      });

      it("Some string is provided through message argument, should send the provided error message to the client", () => {
        const _code = 404;
        const _errorMessage = "User not found";
        const error = responseHandler.notFound(_errorMessage);

        expect(error).toBeInstanceOf(GenericError);
        expect(error.statusCode).toBe(_code);
        expect(error.message).toBe(_errorMessage);
      });
    });
  });

  describe(`"conflict" method`, () => {
    describe("Happy Path", () => {
      it("Message is passed as undefined, should send default conflict error to the client", () => {
        const _code = 409;
        const error = responseHandler.conflict(undefined as any);

        expect(error).toBeInstanceOf(GenericError);
        expect(error.statusCode).toBe(_code);
        expect(error.message).toBe("Conflict");
      });

      it("Some string is provided through message argument, should send the provided error message to the client", () => {
        const _code = 409;
        const _errorMessage = "Name must be a string, but got number";
        const error = responseHandler.conflict(_errorMessage);

        expect(error).toBeInstanceOf(GenericError);
        expect(error.statusCode).toBe(_code);
        expect(error.message).toBe(_errorMessage);
      });
    });
  });

  describe(`"tooManyRequests" method`, () => {
    describe("Happy Path", () => {
      it("Message is passed as undefined, should send default too many requests error to the client", () => {
        const _code = 429;
        const error = responseHandler.tooManyRequests(undefined as any);

        expect(error).toBeInstanceOf(GenericError);
        expect(error.statusCode).toBe(_code);
        expect(error.message).toBe("Too many requests");
      });

      it("Some string is provided through message argument, should send the provided error message to the client", () => {
        const _code = 429;
        const _errorMessage = "Received too many requests";
        const error = responseHandler.tooManyRequests(_errorMessage);

        expect(error).toBeInstanceOf(GenericError);
        expect(error.statusCode).toBe(_code);
        expect(error.message).toBe(_errorMessage);
      });
    });
  });

  describe(`"internalError" method`, () => {
    describe("Happy Path", () => {
      it("Message is passed as undefined, should send default Internal server error to the client", () => {
        const _code = 500;
        const error = responseHandler.internalError(undefined as any);

        expect(error).toBeInstanceOf(GenericError);
        expect(error.statusCode).toBe(_code);
        expect(error.message).toBe("Internal server error");
      });

      it("Some string is provided through message argument, should send the provided error message to the client", () => {
        const _code = 500;
        const _errorMessage = "Something went wrong!";
        const error = responseHandler.internalError(_errorMessage);

        expect(error).toBeInstanceOf(GenericError);
        expect(error.statusCode).toBe(_code);
        expect(error.message).toBe(_errorMessage);
      });
    });
  });
});
