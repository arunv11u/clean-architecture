import { Response, NextFunction } from "express";
import {
  AuthDTO,
  BaseAuthController,
  Controller,
  Post,
  TypedRequest,
} from "../../utils";

@Controller("/auth")
class AuthController implements BaseAuthController {
  @Post("/guest/login")
  async guestLogin(
    request: TypedRequest<{}, {}, AuthDTO.Register>,
    response: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    response.status(200).send({ data: "OK" });
  }

  @Post("/register")
  async register(
    request: TypedRequest<{}, {}, {}>,
    response: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    response.status(200).send({ data: "OK" });
  }
}

export { AuthController };
