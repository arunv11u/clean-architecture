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

const authService = new AuthServiceImpl();
const responseHandler = new ResponseHandlerImpl();
const authValidation = new AuthValidationImpl();

@Controller("/auth")
export class AuthController {
  @Post("/guest/login")
  @Use(authValidation.guestLogin())
  async guestLogin(
    request: TypedRequest<{}, {}, AuthDTO.Register>,
    response: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const _response = await authService.guestLogin(request, response, next);

      responseHandler.ok<string, {}>(response, _response);
    } catch (error) {
      console.error(`Error in guestLogin :`, error);
      next(error);
    };
  };
};