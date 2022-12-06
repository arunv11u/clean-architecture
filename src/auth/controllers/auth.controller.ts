import { Response, NextFunction } from "express";
import {
  AuthDTO,
  Controller,
  Post,
  TypedRequest,
  Use,
} from "../../utils";
import { AuthServiceImpl } from "../services/auth.service";
import { ResponseHandlerImpl } from '../../utils/response-handler';
import { AuthValidationImpl } from "../validations/auth.validation";
import { AuthRO } from "../../utils/types/auth/auth.ro.type";

const authService = new AuthServiceImpl();
const responseHandler = new ResponseHandlerImpl();
const authValidation = new AuthValidationImpl();

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