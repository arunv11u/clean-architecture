import { Response, NextFunction } from "express";
import { AuthDTO, BaseAuthService, TypedRequest } from "../../utils";

export class AuthService implements BaseAuthService {
  private static _instance: BaseAuthService;
  private constructor() {}

  static getInstance(): BaseAuthService {
    if (!AuthService._instance) AuthService._instance = new AuthService();

    return AuthService._instance;
  }

  register(
    request: TypedRequest<{}, {}, AuthDTO.Register>,
    response: Response<any, Record<string, any>>,
    next: NextFunction
  ): void {}

  guestLogin(
    request: TypedRequest<{}, {}, AuthDTO.GuestLogin>,
    response: Response<any, Record<string, any>>,
    next: NextFunction
  ): void {
    
  }
}
