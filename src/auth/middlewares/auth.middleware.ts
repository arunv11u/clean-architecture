import { RequestHandler, Request, Response, NextFunction } from "express";
import { getTokenFactory } from "../../global-config";
import { User, UserDoc } from "../../users/models/user.model";
import { AuthMiddleware, Cookie, CookieImpl, DatabaseService, GenericError, ModSignedCookiesObj, MongooseServiceImpl, SignedCookies, TokenService, ValidateTokenRes } from "../../utils";

export class AuthMiddlewareImpl implements AuthMiddleware {
    private _cookie: Cookie;
    private _tokenService: TokenService;
    private _mongooseService: DatabaseService;

    constructor() {
        this._cookie = new CookieImpl();
        this._tokenService = getTokenFactory().getService();
        this._mongooseService = new MongooseServiceImpl();
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


                if (validatedToken.tokens) {
                    response.cookie(SignedCookies.lifeverseChristmasEventAuthToken, validatedToken.tokens.accessToken);
                    response.cookie(SignedCookies.lifeverseChristmasEventRefreshToken, validatedToken.tokens.refreshToken);
                };

                response.locals.decodedToken = validatedToken.userDecodedPayload;

                const userId = validatedToken.userDecodedPayload.userId;
                const user = await this._mongooseService.findOne(User, { _id: userId });

                const userObj = User.jsonObj(user) as UserDoc;
                response.locals.user = userObj;

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
