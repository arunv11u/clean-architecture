import { Response, Request, NextFunction } from "express";
import { getTokenFactory, getUserFactory } from "../../global-config";
import { AuthDTO, AuthRepository, AuthService, Cookie, CookieImpl, GuestLoginInput, MongooseSessionHelper, MongooseSessionHelperImpl, SignedCookies, TokenDAO, TypedRequest, UserService } from "../../utils";
import { AuthRO } from "../../utils/types/auth/auth.ro.type";
import { AuthRepositoryImpl } from "../repositories/auth.repository";

export class AuthServiceImpl implements AuthService {
  private _authRepository: AuthRepository;
  private _userService: UserService;
  private _mongooseSessionHelper: MongooseSessionHelper;
  private _tokenDAO: TokenDAO;
  private _cookie: Cookie;

  constructor() {
    this._authRepository = new AuthRepositoryImpl();
    this._userService = getUserFactory().getService();
    this._mongooseSessionHelper = new MongooseSessionHelperImpl();
    this._tokenDAO = getTokenFactory().getDAO();
    this._cookie = new CookieImpl();
  };

  async guestLogin(
    request: TypedRequest<{}, {}, AuthDTO.GuestLogin>,
    response: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<AuthRO.GuestLogin> {
    const mongooseSession = await this._mongooseSessionHelper.start();

    try {
      const userId = await this._userService.generateUserId();

      const guestLoginInput: GuestLoginInput = {
        user: {
          name: request.body.name,
          email: request.body.email,
          phone: request.body.phone,
          userId
        }
      };

      await this._authRepository.guestLogin(guestLoginInput, mongooseSession);

      await this._mongooseSessionHelper.commit(mongooseSession);

      return { name: guestLoginInput.user.name, userId: guestLoginInput.user.userId };
    } catch (error) {
      await this._mongooseSessionHelper.abort(mongooseSession);

      throw error;
    };
  };

  async logout(request: TypedRequest<{}, {}, {}>, response: Response<any, Record<string, any>>, next: NextFunction): Promise<void> {
    const signedCookies = this._cookie.getSignedCookies(request as Request);

    await this._tokenDAO.softDeleteRefreshToken(signedCookies.lifeverseChristmasEventRefreshToken);

    this._cookie.clear(response, SignedCookies.lifeverseChristmasEventAuthToken);
    this._cookie.clear(response, SignedCookies.lifeverseChristmasEventRefreshToken);
  };
};
