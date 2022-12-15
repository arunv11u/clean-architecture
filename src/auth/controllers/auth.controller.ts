import { Response, NextFunction } from "express";
import {
  AuthDTO,
  Controller,
  Get,
  Post,
  TypedRequest,
  Use,
} from "../../utils";
import { AuthServiceImpl } from "../services/auth.service";
import { ResponseHandlerImpl } from '../../utils/response-handler';
import { AuthValidationImpl } from "../validations/auth.validation";
import { AuthRO } from "../../utils/types";

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

  @Get("/set-session")
  async setSession(
    request: TypedRequest<{}, {}, {}>,
    response: Response<any, Record<string, any>>,
    next: NextFunction
  ) {
    try {
      request.session.jwt = "jwt token";

      response.status(200).send({ data: "OK" });
    } catch (error) {
      console.error(`Error in checkSession :`, error);
      next(error);
    };
  };

  @Get("/retrieve-session")
  async retrieveSession(
    request: TypedRequest<{}, {}, {}>,
    response: Response<any, Record<string, any>>,
    next: NextFunction
  ) {
    const session = request.session;

    console.log("session ::", session, session.id);

    response.status(200).send({ data: "Checked Session!" });
  };

  @Get("/remove-session")
  async deleteSession(
    request: TypedRequest<{}, {}, {}>,
    response: Response<any, Record<string, any>>,
    next: NextFunction
  ) {

    const promise = new Promise((resolve, reject) => {
      request.session.destroy((err) => {
        if (err) reject(err);

        resolve(true);
      });
    });
    await promise;

    response.status(200).send({ data: "Session Removed!" })
  };
};