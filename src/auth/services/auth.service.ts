import { Response, NextFunction } from "express";
import { getTokenFactory, getUserFactory } from "../../global-config";
import { AuthDTO, AuthRepository, AuthService, GuestLoginInput, MongooseSessionHelper, MongooseSessionHelperImpl, TokenService, TypedRequest, UserService } from "../../utils";
import { AuthRepositoryImpl } from "../repositories/auth.repository";

export class AuthServiceImpl implements AuthService {
  private _authRepository: AuthRepository;
  private _userService: UserService;
  private _tokenService: TokenService;
  private _mongooseSessionHelper: MongooseSessionHelper;

  constructor() {
    this._authRepository = new AuthRepositoryImpl();
    this._userService = getUserFactory().getService();
    this._tokenService = getTokenFactory().getService();
    this._mongooseSessionHelper = new MongooseSessionHelperImpl();
  };

  async guestLogin(
    request: TypedRequest<{}, {}, AuthDTO.GuestLogin>,
    response: Response<any, Record<string, any>>,
    next: NextFunction
  ):Promise<string> {
    const mongooseSession = await this._mongooseSessionHelper.start();

    try {
      const userId = await this._userService.generateUserId();

      const token = await this._tokenService.user({ userId });

      const guestLoginInput: GuestLoginInput = {
        user: {
          name: request.body.name,
          email: request.body.email,
          phone: request.body.phone,
          userId
        },
        token: {
          value: token
        }
      };

      await this._authRepository.guestLogin(guestLoginInput, mongooseSession);

      await this._mongooseSessionHelper.commit(mongooseSession);

      return token;
    } catch (error) {
      await this._mongooseSessionHelper.abort(mongooseSession);
      
      throw error;
    };
  };
};
