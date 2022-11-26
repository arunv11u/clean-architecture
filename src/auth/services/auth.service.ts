import { Response, NextFunction } from "express";
import { AuthDTO, AuthService, TypedRequest } from "../../utils";

export class AuthServiceImpl implements AuthService {
  private static _instance: AuthService;

  constructor() { };

  register(
    request: TypedRequest<{}, {}, AuthDTO.Register>,
    response: Response<any, Record<string, any>>,
    next: NextFunction
  ): void { };

  guestLogin(
    request: TypedRequest<{}, {}, AuthDTO.GuestLogin>,
    response: Response<any, Record<string, any>>,
    next: NextFunction
  ): void {

  };
}
