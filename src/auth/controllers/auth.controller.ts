import { Response, NextFunction } from "express";
import { Controller, Post, TypedRequest } from "../../utils";

@Controller("/auth")
class AuthController {
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
