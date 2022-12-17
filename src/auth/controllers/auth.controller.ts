import { Response, NextFunction, Request } from "express";
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
      response.cookie("sampleapp_auth", "Auth token", { path: "/api", httpOnly: true, secure: false, sameSite: "strict" });
      response.cookie("sampleapp_refresh", "Refresh token", { path: "/api", httpOnly: true, secure: true, sameSite: "strict" });

      console.log("after set exec ::");

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
      console.log("retrieve-session ::", request.header("cookie"), request.cookies);
      // const session = request.session;

      // console.log("session ::", session, session.id);
      // console.log("2nd exec", session.auth, session.refresh);

      response.status(200).send({ data: "Checked Session!" });
    } catch (error) {
      console.error(`Error in retrieveSession :`, error);
      next(error);
    };
  };

  @Get("/delete-session")
  async deleteSession(
    request: TypedRequest<{}, {}, {}>,
    response: Response<any, Record<string, any>>,
    next: NextFunction
  ) {
    try {
      // await storeSession.delete(request.session.id);

      response.status(200).send({ data: "Session Deleted!" });
    } catch (error) {
      console.error(`Error in deleteSession :`, error);
      next(error);
    };
  };
};