import { Response, NextFunction, Request } from "express";
import nconf from "nconf";
import {
  AuthDTO,
  Controller,
  CookieImpl,
  Get,
  Post,
  TypedRequest,
  Use
} from "../../utils";
import { AuthServiceImpl } from "../services/auth.service";
import { ResponseHandlerImpl } from '../../utils/response-handler';
import { AuthValidationImpl } from "../validations/auth.validation";
import { AuthRO, Cookies } from "../../utils/types";

const authService = new AuthServiceImpl();
const responseHandler = new ResponseHandlerImpl();
const authValidation = new AuthValidationImpl();
const cookie = new CookieImpl();


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
  
};