import { Response } from "express";
import { GenericError } from "./errors";
import { ResponseHandler } from "./response-handler";

describe("Response Handler Module", () => {
  describe(`"getInstance" method`, () => {
    describe("Happy Path", () => {
      it("No input has passed, should return config object", () => {
        const _responseHandler = ResponseHandler.getInstance();

        expect(_responseHandler).toBeInstanceOf(ResponseHandler);
      });
    });
  });

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
        const _responseHandler = ResponseHandler.getInstance();

        expect(() => _responseHandler.ok(undefined as any)).toThrow(
          GenericError
        );
        expect(() => _responseHandler.ok(undefined as any)).toThrow(
          "Response object is undefined, expected express response object"
        );
      });
    });

    describe("Happy Path", () => {
      it("Response object and null response data has passed as arguments, should send success response and null data to the client", () => {
        const _code = 200;
        const _responseHandler = ResponseHandler.getInstance();
        _responseHandler.ok(mockResponse as Response);

        expect(mockResponse.status).toBeCalledWith(_code);
        expect(mockResponse.type).toBeCalledWith("application/json");
        expect(mockSendMethod).toBeCalledWith({ data: null });
      });

      it("Response object and some response data has passed as arguments, should send success response and also the data to the client", () => {
        const _code = 200;
        const _data = "Sample data";
        const _responseHandler = ResponseHandler.getInstance();
        _responseHandler.ok<string, any>(mockResponse as Response, _data);

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
        const _responseHandler = ResponseHandler.getInstance();

        expect(() => _responseHandler.created(undefined as any)).toThrow(
          GenericError
        );
        expect(() => _responseHandler.created(undefined as any)).toThrow(
          "Response object is undefined, expected express response object"
        );
      });
    });

    describe("Happy Path", () => {
      it("Response object and null response data has passed as arguments, should send success response and null data to the client", () => {
        const _code = 201;
        const _responseHandler = ResponseHandler.getInstance();
        _responseHandler.created(mockResponse as Response);

        expect(mockResponse.status).toBeCalledWith(_code);
        expect(mockResponse.type).toBeCalledWith("application/json");
        expect(mockSendMethod).toBeCalledWith({ data: null });
      });

      it("Response object and some response data has passed as arguments, should send success response and also the data to the client", () => {
        const _code = 201;
        const _data = "Sample data";
        const _responseHandler = ResponseHandler.getInstance();
        _responseHandler.created<string, any>(mockResponse as Response, _data);

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
        const _responseHandler = ResponseHandler.getInstance();
        const error = _responseHandler.clientError(undefined as any);

        expect(error).toBeInstanceOf(GenericError);
        expect(error.statusCode).toBe(_code);
        expect(error.message).toBe("Bad Request");
      });

      it("Some string is provided through message argument, should send the provided error message to the client", () => {
        const _code = 400;
        const _errorMessage = "Name is required";
        const _responseHandler = ResponseHandler.getInstance();
        const error = _responseHandler.clientError(_errorMessage);

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
        const _responseHandler = ResponseHandler.getInstance();
        const error = _responseHandler.unauthorized(undefined as any);

        expect(error).toBeInstanceOf(GenericError);
        expect(error.statusCode).toBe(_code);
        expect(error.message).toBe("Unauthorized");
      });

      it("Some string is provided through message argument, should send the provided error message to the client", () => {
        const _code = 401;
        const _errorMessage = "Token is invalid";
        const _responseHandler = ResponseHandler.getInstance();
        const error = _responseHandler.unauthorized(_errorMessage);

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
        const _responseHandler = ResponseHandler.getInstance();
        const error = _responseHandler.paymentRequired(undefined as any);

        expect(error).toBeInstanceOf(GenericError);
        expect(error.statusCode).toBe(_code);
        expect(error.message).toBe("Payment required");
      });

      it("Some string is provided through message argument, should send the provided error message to the client", () => {
        const _code = 402;
        const _errorMessage = "Payment not done";
        const _responseHandler = ResponseHandler.getInstance();
        const error = _responseHandler.paymentRequired(_errorMessage);

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
        const _responseHandler = ResponseHandler.getInstance();
        const error = _responseHandler.forbidden(undefined as any);

        expect(error).toBeInstanceOf(GenericError);
        expect(error.statusCode).toBe(_code);
        expect(error.message).toBe("Forbidden");
      });

      it("Some string is provided through message argument, should send the provided error message to the client", () => {
        const _code = 403;
        const _errorMessage = "You don't have enough access";
        const _responseHandler = ResponseHandler.getInstance();
        const error = _responseHandler.forbidden(_errorMessage);

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
        const _responseHandler = ResponseHandler.getInstance();
        const error = _responseHandler.notFound(undefined as any);

        expect(error).toBeInstanceOf(GenericError);
        expect(error.statusCode).toBe(_code);
        expect(error.message).toBe("Not found");
      });

      it("Some string is provided through message argument, should send the provided error message to the client", () => {
        const _code = 404;
        const _errorMessage = "User not found";
        const _responseHandler = ResponseHandler.getInstance();
        const error = _responseHandler.notFound(_errorMessage);

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
        const _responseHandler = ResponseHandler.getInstance();
        const error = _responseHandler.conflict(undefined as any);

        expect(error).toBeInstanceOf(GenericError);
        expect(error.statusCode).toBe(_code);
        expect(error.message).toBe("Conflict");
      });

      it("Some string is provided through message argument, should send the provided error message to the client", () => {
        const _code = 409;
        const _errorMessage = "Name must be a string, but got number";
        const _responseHandler = ResponseHandler.getInstance();
        const error = _responseHandler.conflict(_errorMessage);

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
        const _responseHandler = ResponseHandler.getInstance();
        const error = _responseHandler.tooManyRequests(undefined as any);

        expect(error).toBeInstanceOf(GenericError);
        expect(error.statusCode).toBe(_code);
        expect(error.message).toBe("Too many requests");
      });

      it("Some string is provided through message argument, should send the provided error message to the client", () => {
        const _code = 429;
        const _errorMessage = "Received too many requests";
        const _responseHandler = ResponseHandler.getInstance();
        const error = _responseHandler.tooManyRequests(_errorMessage);

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
        const _responseHandler = ResponseHandler.getInstance();
        const error = _responseHandler.internalError(undefined as any);

        expect(error).toBeInstanceOf(GenericError);
        expect(error.statusCode).toBe(_code);
        expect(error.message).toBe("Internal server error");
      });

      it("Some string is provided through message argument, should send the provided error message to the client", () => {
        const _code = 500;
        const _errorMessage = "Something went wrong!";
        const _responseHandler = ResponseHandler.getInstance();
        const error = _responseHandler.internalError(_errorMessage);

        expect(error).toBeInstanceOf(GenericError);
        expect(error.statusCode).toBe(_code);
        expect(error.message).toBe(_errorMessage);
      });
    });
  });
});
