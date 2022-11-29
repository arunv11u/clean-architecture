import { Response, NextFunction } from "express";
import {
  AuthDTO,
  Controller,
  Post,
  TypedRequest,
} from "../../utils";
import { AuthServiceImpl } from "../services/auth.service";
import { ResponseHandlerImpl } from '../../utils/response-handler';

// const authService = new AuthServiceImpl();
const responseHandler = new ResponseHandlerImpl();


@Controller("/auth")
export class AuthController {
  @Post("/guest/login")
  async guestLogin(
    request: TypedRequest<{}, {}, AuthDTO.Register>,
    response: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      // const _response = await authService.guestLogin(request, response, next);

      // responseHandler.ok<string, {}>(response, "");
    } catch (error) {
      console.error(`Error in guestLogin :`, error);
      next(error);
    };
  };
};