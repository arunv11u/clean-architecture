import { RequestHandler, Request, Response, NextFunction } from "express";
import nconf from "nconf";
import { AuthMiddleware, Cookie, CookieImpl, GenericError, ModSignedCookiesObj, SignedCookies, TokenService, UserDAO, UserDecodedPayload, ValidateTokenRes } from "../../utils";

export class AuthMiddlewareImpl implements AuthMiddleware {
    private _cookie: Cookie;
    private _tokenService: TokenService;
    private _userDAO: UserDAO;

    constructor(tokenService: TokenService, userDAO: UserDAO) {
        this._cookie = new CookieImpl();
        this._tokenService = tokenService;
        this._userDAO = userDAO;
    };


    private async validateToken(signedcookies: ModSignedCookiesObj): Promise<ValidateTokenRes> {
        try {
            const decodedToken = await this._tokenService.verify(signedcookies.lifeverseChristmasEventAuthToken);

            return { userDecodedPayload: decodedToken };
        } catch (error) {
            const userRefreshTokenRes = await this._tokenService.refreshUser(signedcookies.lifeverseChristmasEventRefreshToken);

            return userRefreshTokenRes;
        };
    };

    private auth(): RequestHandler {
        return async function (this: AuthMiddlewareImpl, request: Request, response: Response, next: NextFunction) {
            try {
                const signedcookies = this._cookie.getSignedCookies(request);

                if (!signedcookies.lifeverseChristmasEventAuthToken) throw new GenericError({ error: new Error("Unauthorized"), errorCode: 401 });

                const validatedToken = await this.validateToken(signedcookies);

                if (validatedToken.isStolenToken) {
                    this._cookie.clear(response, SignedCookies.lifeverseChristmasEventAuthToken);
                    this._cookie.clear(response, SignedCookies.lifeverseChristmasEventRefreshToken);

                    throw new GenericError({ error: new Error("Session expired, please login to continue"), errorCode: 401 });
                };

                if (validatedToken.refreshedTokens) {
                    this._cookie.setSignedCookies(response,
                        {
                            name: SignedCookies.lifeverseChristmasEventAuthToken,
                            value: validatedToken.refreshedTokens.accessToken
                        },
                        { maxAge: nconf.get("authExpiryMs") });
                        
                    this._cookie.setSignedCookies(response,
                        {
                            name: SignedCookies.lifeverseChristmasEventRefreshToken,
                            value: validatedToken.refreshedTokens.refreshToken
                        },
                        { maxAge: nconf.get("refreshExpiryMs") });
                };

                response.locals.decodedToken = validatedToken.userDecodedPayload;

                const userDecodedPayload = validatedToken.userDecodedPayload as UserDecodedPayload;
                const userId = userDecodedPayload.userId;
                const user = await this._userDAO.findById(userId);

                response.locals.user = user;

                next();
            } catch (error) {
                console.error("Error in Auth ::", error);

                next(error);
            };
        };
    };

    checkAuthorization(): RequestHandler {
        return this.auth().bind(this);
    };
};
