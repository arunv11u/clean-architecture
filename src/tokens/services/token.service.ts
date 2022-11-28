import { ResponseHandler, ResponseHandlerImpl, UserTokenPayload, TokenService, NCONF, config, UserDecodedPayload } from "../../utils";
import jwt from "jsonwebtoken";

export class TokenServiceImpl implements TokenService {

    private _reponseHandler: ResponseHandler;
    private _nconf: NCONF;

    constructor() {
        this._reponseHandler = new ResponseHandlerImpl();
        this._nconf = config.nconf;
    };

    async user(payload: UserTokenPayload): Promise<string> {

        if (!payload) throw this._reponseHandler.internalError("Payload is invalid");

        const secretKey: string = this._nconf.get("jwtSecretKey");

        const tokenGeneratePromise = new Promise<string>((resolve, reject) => {
            jwt.sign(payload, secretKey, {}, (err, token) => {
                if (err) reject(this._reponseHandler.internalError("JWT token generation failed"));

                resolve(token as string);
            });
        });

        return tokenGeneratePromise;
    };

    async verify(token: string): Promise<UserDecodedPayload> {
        if (!token) throw this._reponseHandler.internalError("Token is invalid");

        const secretKey: string = this._nconf.get("jwtSecretKey");
        const verifyTokenPromise = new Promise<UserDecodedPayload>((resolve, reject) => {
            jwt.verify(token, secretKey, {}, (err, decoded) => {
                if (err) return reject(this._reponseHandler.internalError("Token is invalid"));

                const _decoded: UserDecodedPayload = {
                    userId: (decoded as jwt.JwtPayload).userId
                };

                resolve(_decoded);
            });
        });

        return verifyTokenPromise;
    };
};
