import jwt from "jsonwebtoken";
import nconf from "nconf";
import { ResponseHandler, ResponseHandlerImpl, UserTokenPayload, TokenService, UserDecodedPayload, UserRefreshTokenRes, TokenTypes } from "../../utils";



export class TokenServiceImpl implements TokenService {

    private _reponseHandler: ResponseHandler;

    constructor() {
        this._reponseHandler = new ResponseHandlerImpl();
    };

    async user(payload: UserTokenPayload, options?: jwt.SignOptions): Promise<string> {

        if (!payload) throw this._reponseHandler.internalError("Payload is invalid");

        const secretKey: string = nconf.get("jwtSecretKey");

        const tokenGeneratePromise = new Promise<string>((resolve, reject) => {
            jwt.sign(JSON.stringify(payload), secretKey, {}, (err, token) => {
                if (err) reject(this._reponseHandler.internalError("JWT token generation failed"));

                resolve(token as string);
            });
        });

        return tokenGeneratePromise;
    };

    async verify(token: string): Promise<UserDecodedPayload> {
        if (!token) throw this._reponseHandler.internalError("Token is invalid");

        const secretKey: string = nconf.get("jwtSecretKey");
        const verifyTokenPromise = new Promise<UserDecodedPayload>((resolve, reject) => {
            jwt.verify(token, secretKey, {}, (err, decoded) => {
                if (err) return reject(this._reponseHandler.internalError("Token is invalid"));

                decoded = JSON.parse(decoded as string) as jwt.JwtPayload;
                const _decoded: UserDecodedPayload = {
                    type: decoded.type,
                    userId: decoded.userId
                };

                resolve(_decoded);
            });
        });

        return verifyTokenPromise;
    };

    async refreshUser(token: string, options?: jwt.SignOptions): Promise<UserRefreshTokenRes> {
        if (!token) throw this._reponseHandler.internalError("Token is invalid");
        
        const decodedToken = await this.verify(token);
        
        const userTokenPayload: UserTokenPayload = {
            type: TokenTypes.refresh,
            userId: decodedToken.userId
        };

        const accessToken = await this.user(userTokenPayload, { expiresIn: nconf.get("authExpiryMs") })
        const refreshToken = await this.user(userTokenPayload, { expiresIn: nconf.get("refreshExpiryMs") });

        return {
            tokens: {
                accessToken, refreshToken
            },
            userDecodedPayload: userTokenPayload
        };
    };
};
