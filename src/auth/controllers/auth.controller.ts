import { Response, NextFunction } from "express";
import {
  AuthDTO,
  Controller,
  Post,
  TypedRequest,
} from "../../utils";

@Controller("/auth")
export class AuthController {
  @Post("/guest/login")
  async guestLogin(
    request: TypedRequest<{}, {}, AuthDTO.Register>,
    response: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      response.status(200).send({ data: "OK" });
    } catch (error) {
      console.error(`Error in guestLogin :`, error);
      next(error);
    };
  };
};