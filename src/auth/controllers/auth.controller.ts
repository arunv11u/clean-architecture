import { Response, NextFunction } from "express";
import { ResponseHandlerImpl } from '../../utils/response-handler';
import { AuthRO } from "../../utils/types";
import {
  AuthDTO,
  Controller,
  Post,
  TypedRequest,
  Use
} from "../../utils";
import { getTokenFactory, getUserFactory } from "../../global-config";
import { AuthServiceImpl } from "../services/auth.service";
import { AuthValidationImpl } from "../validations/auth.validation";
import { AuthMiddlewareImpl } from "../middlewares/auth.middleware";

const tokenFactory = getTokenFactory();
const userFactory = getUserFactory();

const authService = new AuthServiceImpl();
const responseHandler = new ResponseHandlerImpl();
const authValidation = new AuthValidationImpl();
const authMiddleware = new AuthMiddlewareImpl(tokenFactory.getService(), userFactory.getDAO());


@Controller("/auth")
export class AuthController {
  @Post("/guest-login")
  @Use(authValidation.guestLogin())
  async guestLogin(
    request: TypedRequest<{}, {}, AuthDTO.GuestLogin>,
    response: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const responseData = await authService.guestLogin(request, response, next);

      responseHandler.ok<AuthRO.GuestLogin, {}>(response, responseData);
    } catch (error) {
      console.error(`Error in guestLogin :`, error);
      next(error);
    };
  };

  @Post("/logout")
  @Use(authMiddleware.checkAuthorization())
  async logout(
    request: TypedRequest<{}, {}, {}>,
    response: Response<any, Record<string, any>>,
    next: NextFunction
  ) {
    try {
      await authService.logout(request, response, next);

      responseHandler.ok(response);
    } catch (error) {
      console.error("Error in logout :", error);
      next(error);
    };
  };
};