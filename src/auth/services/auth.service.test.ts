import { faker } from "@faker-js/faker";
import { Request, Response, NextFunction } from "express";
import mockTokenServiceImpl, { mockUser } from "../../tokens/services/__mocks__/token.service.mock";
import mockUserServiceImpl, { mockGenerateUserId } from "../../users/services/__mocks__/user.service.mock";
import { AuthService } from "../../utils";
import mockMongooseSessionHelperImpl, { mockAbort, mockCommit, mockStart } from "../../utils/helpers/__mocks__/mongoose-session.helper.mock";
import { AuthRO } from "../../utils/types/auth/auth.ro.type";
import mockAuthRepositoryImpl, { mockGuestLogin } from "../repositories/__mocks__/auth.repository.mock";
import { AuthServiceImpl } from "./auth.service";

jest.mock("../../users/services/user.service", () => {
  return {
    UserServiceImpl: mockUserServiceImpl
  };
});

jest.mock("../../tokens/services/token.service", () => {
  return {
    TokenServiceImpl: mockTokenServiceImpl
  };
});

jest.mock("../repositories/auth.repository", () => {
  return {
    AuthRepositoryImpl: mockAuthRepositoryImpl
  };
});

jest.mock("../../utils/helpers/mongoose-session.helper", () => {
  return {
    MongooseSessionHelperImpl: mockMongooseSessionHelperImpl
  };
});

describe("Auth Component", () => {
  let authService: AuthService;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const mockNextFunction: jest.Mock = jest.fn();

  beforeEach(() => {
    authService = new AuthServiceImpl();
    mockRequest = {
      body: {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        phone: {
          code: "+91",
          number: "9876543210"
        }
      }
    };
    mockResponse = {};
  });

  afterEach(() => {
    mockStart.mockReset();
    mockGenerateUserId.mockReset();
    mockUser.mockReset();
    mockGuestLogin.mockReset();
    mockCommit.mockReset();
    mockAbort.mockReset();
  });
  describe("Service Module", () => {

    describe(`"guestLogin" method`, () => {

      describe("Exception Path", () => {
        it("If error occurs, should abort transaction and end session and throw the error back to the controller", async () => {
          const error = new Error("Something went wrong!");
          mockGuestLogin.mockImplementation(() => { throw error });

          await expect(() => authService.guestLogin(mockRequest as Request, mockResponse as Response, mockNextFunction)).rejects.toThrow(error);
        });
      });

      describe("Happy Path", () => {
        it("If guest login request made, should save the user, and return the user details", async () => {
          const userId = faker.random.alphaNumeric(8);

          mockGenerateUserId.mockImplementation(() => userId);

          const userDetails = await authService.guestLogin(mockRequest as Request, mockResponse as Response, mockNextFunction);

          const expectedResult: AuthRO.GuestLogin = { name: mockRequest.body.name, userId };

          expect(mockStart).toHaveBeenCalled();
          expect(mockAuthRepositoryImpl).toHaveBeenCalled();
          expect(mockGenerateUserId).toHaveBeenCalled();
          expect(mockUser).toHaveBeenCalled();
          expect(mockGuestLogin).toHaveBeenCalled();
          expect(mockCommit).toHaveBeenCalled();
          expect(userDetails).toStrictEqual(expectedResult);
        });
      });
    });
  });
});
