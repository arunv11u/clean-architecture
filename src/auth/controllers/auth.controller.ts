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

  @Get("/set-session")
  async setSession(
    request: TypedRequest<{}, {}, {}>,
    response: Response<any, Record<string, any>>,
    next: NextFunction
  ) {
    try {
      cookie.set(response, { name: Cookies.sampleapp_auth, value: "Auth Token" }, { signed: true, maxAge: nconf.get("authExpiryMs") });
      cookie.set(response, { name: Cookies.sampleapp_refresh, value: "Refresh Token" }, { signed: true, maxAge: nconf.get("refreshExpiryMs") });


      response.status(200).send({ data: "OK" });
    } catch (error) {
      console.error(`Error in checkSession :`, error);
      next(error);
    };
  };

  @Get("/retrieve-session")
  async retrieveSession(
    request: Request,
    response: Response<any, Record<string, any>>,
    next: NextFunction
  ) {
    try {
      const signedCookies = cookie.getSignedCookies(request);
      console.log("retrieve-session ::", signedCookies);

      response.status(200).send({ data: "Checked Session!" });
    } catch (error) {
      console.error(`Error in retrieveSession :`, error);
      next(error);
    };
  };

  @Get("/delete-session")
  async deleteSession(
    request: Request,
    response: Response<any, Record<string, any>>,
    next: NextFunction
  ) {
    try {
      cookie.clear(response, Cookies.sampleapp_refresh, { path: '/api' });

      response.status(200).send({ data: "Session Deleted!" });
    } catch (error) {
      console.error(`Error in deleteSession :`, error);
      next(error);
    };
  };
};