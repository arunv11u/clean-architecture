import { Response, NextFunction } from "express";
import { AuthDTO, AuthRepository, AuthService, GuestLoginInput, TypedRequest } from "../../utils";
import { AuthRepositoryImpl } from "../repositories/auth.repository";

export class AuthServiceImpl implements AuthService {
  private static _instance: AuthService;
  private _authRepository: AuthRepository;

  constructor() {
    this._authRepository = new AuthRepositoryImpl();
  };

  async guestLogin(
    request: TypedRequest<{}, {}, AuthDTO.GuestLogin>,
    response: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    const token:string = "";
    
    const guestLoginInput: GuestLoginInput = {
      user: {
        name: request.body.name,
        email: request.body.email,
        mobileNumber: request.body.mobileNumber
      },
      token: {
        value: token
      }
    };

    await this._authRepository.guestLogin(guestLoginInput);
  };
}
